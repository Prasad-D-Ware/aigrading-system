import { Octokit } from "@octokit/rest";

const parseGitHubUrl = (url: string) => {
	try {
		const urlParts = url
			.replace("https://github.com/", "")
			.replace(".git", "")
			.split("/");
		return {
			owner: urlParts[0],
			repo: urlParts[1],
		};
	} catch (error) {
		throw new Error("Invalid GitHub URL format");
	}
};

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN, // Your GitHub personal access token
});

export async function getRepositoryInfo(repoUrl: string) {
	const { owner, repo } = parseGitHubUrl(repoUrl);

	try {
		// Fetch repository details
		const { data: repository } = await octokit.repos.get({
			owner,
			repo,
		});

		// Fetch contributor count
		const { data: contributors } = await octokit.repos.listContributors({
			owner,
			repo,
			per_page: 160, // We just want the total count
		});

		// Fetch repository languages
		const { data: languages } = await octokit.repos.listLanguages({
			owner,
			repo,
		});

		return {
			name: repository.name,
			fullName: repository.full_name,
			description: repository.description,
			creator: repository.owner.login,
			createdAt: repository.created_at,
			updatedAt: repository.updated_at,
			stars: repository.stargazers_count,
			forks: repository.forks_count,
			// contributorCount: repository.contributors,
			visibility: repository.visibility,
			language: Object.keys(languages)[0], // Primary language
			totalContributors: contributors.length,
			repositoryUrl: repository.html_url,
			defaultBranch: repository.default_branch,
		};
	} catch (error: any) {
		console.error("Error fetching repository info:", error.message);
		throw error;
	}
}


export async function fetchRepositoryContributors(repoUrl : string) {
    try {
      const { owner, repo } = parseGitHubUrl(repoUrl);

      const { data: contributors } = await octokit.repos.listContributors({
        owner,
        repo,
        per_page: 100, // Adjust as needed
      });

      // Transform the data to include only necessary information
      return contributors.map(contributor => ({
        username: contributor.login,
        id: contributor.id,
        avatarUrl: contributor.avatar_url,
        contributions: contributor.contributions,
        profileUrl: contributor.html_url,
      }));


    } catch (error) {
      console.error('Error fetching contributors:', error);
      throw error;
    }
  }


export async function getContributorDetailedStats(repoUrl : string , username : string) {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  
  try {
    // Get all commits by the contributor
    const commits = await octokit.paginate(octokit.repos.listCommits, {
      owner,
      repo,
      author: username,
      per_page: 100,
    });

    // Get commit statistics
    let totalAdditions = 0;
    let totalDeletions = 0;
    const commitDates = new Set();
    
    // Fetch detailed commit data for each commit
    const commitStats = await Promise.all(
      commits.slice(0, 100).map(async (commit) => { // Limit to last 100 commits for performance
        const { data: commitData } = await octokit.repos.getCommit({
          owner,
          repo,
          ref: commit.sha,
        });

        // Add stats
        totalAdditions += commitData.stats?.additions || 0;
        totalDeletions += commitData.stats?.deletions || 0;
        // @ts-ignore
        commitDates.add(commit.commit.author.date.split('T')[0]);

        return {
          sha: commit.sha,
          // @ts-ignore
          date: commit.commit.author.date,
          message: commit.commit.message,
          stats: commitData.stats,
          files: commitData.files,
        };
      })
    );

    // Get weekly commit activity
    const { data: weeklyCommits } = await octokit.repos.getCommitActivityStats({
      owner,
      repo,
    });

    // Calculate languages used
    const { data: languages } = await octokit.repos.listLanguages({
      owner,
      repo,
    });

    return {
      username,
      totalCommits: commits.length,
      totalAdditions,
      totalDeletions,
      activeDays: commitDates.size,
      commitHistory: commitStats.map(commit => ({
        date: commit.date,
        message: commit.message,
        additions: commit.stats?.additions || 0,
        deletions: commit.stats?.deletions || 0,
        files: commit.files?.map(file => ({
          name: file.filename,
          changes: file.changes,
          additions: file.additions,
          deletions: file.deletions,
        })),
      })),
      languages: Object.keys(languages),
      weeklyActivity: weeklyCommits || [], // Last 12 weeks
    };
  } catch (error) {
    console.error('Error fetching contributor stats:', error);
    throw error;
  }
}

// export async function getUserCodeCommits(username : string) {
//     // Step 1: Get repositories of the user
//     const repos = await octokit.rest.repos.listForUser({ username });

//     for (const repo of repos.data) {
//       // Step 2: Get commits authored by the user in each repository
//       const commits = await octokit.rest.repos.listCommits({
//         owner: repo.owner.login,
//         repo: repo.name,
//         author: username
//       });

//       console.log(`Commits in ${repo.name}:`);

//       for (const commit of commits.data) {
//         console.log(`- Commit SHA: ${commit.sha}`);

//         // Step 3: Get detailed commit information
//         const commitDetails = await octokit.rest.repos.getCommit({
//           owner: repo.owner.login,
//           repo: repo.name,
//           ref: commit.sha
//         });

//         // Displaying files changed in the commit
//         //@ts-ignore
//         commitDetails.data.files.forEach(file => {
//           console.log(`  - File: ${file.filename}, Status: ${file.status}`);
//         });
//       }
//     }
//   }
