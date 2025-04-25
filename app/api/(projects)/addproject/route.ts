import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Student from "@/lib/models/student";
import Teacher from "@/lib/models/teacher";
import {
	fetchRepositoryContributors,
	getContributorDetailedStats,
	getRepositoryInfo,
} from "@/utils/github";
import { NextResponse } from "next/server";
import { v4 as uuid4 } from "uuid";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
	const { projectName, projectUrl, username } = await req.json();

	if (!projectName || !projectUrl || !username) {
		return NextResponse.json({
			msg: "Fill Required Details!",
		});
	}

	// Initialize session for transaction
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const repoInfo = await getRepositoryInfo(projectUrl);

		if (!repoInfo) {
			return NextResponse.json({
				msg: "Error while fetching repo info ",
			});
		}

		// console.log(repoInfo);
		repoInfo.name = projectName;

		await connectDB();

		const project_id = uuid4();

		const teacher = await Teacher.findOne(
			{
				username: username,
			},
			{
				_id: 0,
				username: 1,
				projects: 1,
			}
		).session(session);

		if (!teacher) {
			await session.abortTransaction();
			session.endSession();
			return NextResponse.json({
				msg: "No Teacher found!",
			});
		}

		const contributors = await fetchRepositoryContributors(projectUrl);

		let totalProjectAdditions = 0;
		let totalProjectDeletions = 0;
		
		let projectContributers : any  = [];

		await Promise.all(
			contributors?.map(async (contributor) => {
				const detailedStats = await getContributorDetailedStats(
					projectUrl,
					contributor.username || ""
				);

				totalProjectAdditions += detailedStats.totalAdditions;
				totalProjectDeletions += detailedStats.totalDeletions;

				const user_id = uuid4();

				const projectContributer = {
					...contributor,
					user_id : user_id
				}

				projectContributers.push(projectContributer);

				const studentContributor = {
					project_id,
					user_id: user_id,
					github_username: contributor.username,
					github_id : contributor.id,
					profile_url: contributor.profileUrl,
					avatar_url: contributor.avatarUrl,
					total_commits: detailedStats.totalCommits,
					total_additions: detailedStats.totalAdditions,
					total_deletions: detailedStats.totalDeletions,
					active_days: detailedStats.activeDays,
					commit_history: detailedStats.commitHistory,
					languages: detailedStats.languages,
					weekly_activity: detailedStats.weeklyActivity,
				};

				return Student.create([studentContributor], { session });
			}) || []
		);

		projectContributers.reverse();

		const project = {
			project_id: project_id,
			project_name: projectName,
			project_url: projectUrl,
			full_name: repoInfo.fullName,
			project_creator: repoInfo.creator,
			description: repoInfo.description,
			no_of_contributors: repoInfo.totalContributors,
			created_at: repoInfo.createdAt,
			updated_at: repoInfo.updatedAt,
			forks: repoInfo.forks,
			stars: repoInfo.stars,
			visibility: repoInfo.visibility,
			language: repoInfo.language,
			contributors: projectContributers,
			projectStats: {
				totalCommits: repoInfo.totalCommits,
				avgCommits: repoInfo.avgCommits,
				totalProjectAdditions, 
				totalProjectDeletions
			},
		};

		const ProjectObj = await Project.create([project], { session });

		if (!ProjectObj) {
			await session.abortTransaction();
			session.endSession();
			return NextResponse.json({
				msg: "Error creating project",
			});
		}

		await Teacher.updateOne(
			{
				username: teacher.username,
			},
			{
				$push: {
					projects: project_id,
				},
			},
			{ session }
		);

		// Commit the transaction
		await session.commitTransaction();
		session.endSession();

		return NextResponse.json({
			msg: "Project Created Successfully!",
		});
	} catch (error: any) {
		// Abort transaction in case of error
		await session.abortTransaction();
		session.endSession();
		
		console.log("Error while adding project : ", error.message);
		return NextResponse.json({
			msg: "Error while adding project : " + error.message,
		});
	}
};
