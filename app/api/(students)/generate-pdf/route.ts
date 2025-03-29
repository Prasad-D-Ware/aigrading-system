import { NextResponse } from "next/server";
import jsPDF from "jspdf";

export const POST = async (req: Request) => {
	try {
		const { gradeData, studentName, studentData } = await req.json();

		// Create new PDF document with A4 size
		const doc = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4",
		});

		// Set initial y position and page height
		let yPos = 20;
		const pageHeight = 297; // A4 height in mm
		const margin = 20;
		const maxWidth = 170; // A4 width - 2 * margin

		// Function to check if we need a new page
		const checkNewPage = (spaceNeeded: number) => {
			if (yPos + spaceNeeded > pageHeight - margin) {
				doc.addPage();
				yPos = margin;
			}
		};

		// Function to add a section header
		const addSectionHeader = (text: string, fontSize: number = 16) => {
			checkNewPage(15);
			doc.setFontSize(fontSize);
			doc.setTextColor(88, 28, 135); // Purple color
			doc.text(text, margin, yPos);
			yPos += 15;
			doc.setTextColor(0, 0, 0); // Reset to black
		};

		// Function to add text with wrapping
		const addWrappedText = (text: string, fontSize: number = 12) => {
			if (!text) return;
			doc.setFontSize(fontSize);
			const lines = doc.splitTextToSize(text, maxWidth);
			checkNewPage(lines.length * 7);
			doc.text(lines, margin, yPos);
			yPos += lines.length * 7 + 5;
		};

		// Function to add a stat box
		const addStatBox = (label: string, value: string | number, x: number) => {
			if (value === undefined || value === null) return;
			doc.setFillColor(245, 245, 245);
			doc.roundedRect(x, yPos, 40, 20, 3, 3, "F");
			doc.setFontSize(10);
			doc.setFont("helvetica", "normal");
			doc.text(label, x + 5, yPos + 8);
			doc.setFontSize(12);
			doc.setFont("helvetica", "bold");
			doc.text(value.toString(), x + 5, yPos + 15);
			doc.setFont("helvetica", "normal");
		};

		// Add title with minimal styling
		doc.setFontSize(24);
		doc.setFont("helvetica", "bold");
		doc.text("GradeAI Report", margin, 20);
		doc.setFont("helvetica", "normal");
		yPos = 40;

		// Add student information section
		if (studentName) {
			addSectionHeader("Student Information", 18);
			doc.setFontSize(14);
			doc.setFont("helvetica", "bold");
			doc.text(studentName, margin, yPos);
			doc.setFont("helvetica", "normal");
			yPos += 10;
		}

		if (studentData?.github_username) {
			doc.setFontSize(12);
			doc.text(`GitHub: ${studentData.github_username}`, margin, yPos);
			yPos += 8;
		}

		if (studentData?.profile_url) {
			doc.text(`Profile: ${studentData.profile_url}`, margin, yPos);
			yPos += 15;
		}

		// Add statistics section with modern boxes
		const stats = [
			{ label: "Commits", value: studentData?.total_commits },
			{ label: "Additions", value: studentData?.total_additions },
			{ label: "Deletions", value: studentData?.total_deletions },
			{ label: "Active Days", value: studentData?.active_days },
		].filter((stat) => stat.value !== undefined && stat.value !== null);

		if (stats.length > 0) {
			addSectionHeader("Project Statistics", 18);
			yPos -= 5;
			stats.forEach((stat, index) => {
				addStatBox(stat.label, stat.value, margin + index * 45);
			});
			yPos += 35;
		}

		// Add languages section only if languages exist and are not empty
		if (studentData?.languages && studentData.languages.length > 0) {
			addSectionHeader("Programming Languages", 18);
			doc.setFontSize(12);
			const languagesText = studentData.languages.join(", ");
			addWrappedText(languagesText);
			yPos += 5;
		}

		// Add grade information with modern styling
		if (gradeData?.grade || gradeData?.numericalScore) {
			addSectionHeader("Grade Information", 18);
			doc.setFontSize(20);
			doc.setFont("helvetica", "bold");
			doc.setTextColor(88, 28, 135); // Purple color
			if (gradeData.grade) doc.text(`Grade: ${gradeData.grade}`, margin, yPos);
			if (gradeData.numericalScore)
				doc.text(`Score: ${gradeData.numericalScore}`, margin, yPos + 10);
			yPos += 25;
			doc.setTextColor(0, 0, 0); // Reset to black
			doc.setFont("helvetica", "normal");
		}

		// Add evaluation summary
		if (gradeData?.evaluation?.summary) {
			addSectionHeader("Evaluation Summary", 16);
			addWrappedText(gradeData.evaluation.summary);
			yPos += 5;
		}

		// Add strengths
		if (gradeData?.evaluation?.strengths?.length > 0) {
			addSectionHeader("Strengths", 16);
			doc.setFontSize(12);
			gradeData.evaluation.strengths.forEach((strength: string) => {
				if (strength) addWrappedText(`• ${strength}`);
			});
			yPos += 5;
		}

		// Add areas for improvement
		if (gradeData?.evaluation?.areasForImprovement?.length > 0) {
			addSectionHeader("Areas for Improvement", 16);
			gradeData.evaluation.areasForImprovement.forEach((area: string) => {
				if (area) addWrappedText(`• ${area}`);
			});
			yPos += 5;
		}

		// Add recommendations
		if (gradeData?.evaluation?.recommendations?.length > 0) {
			addSectionHeader("Recommendations", 16);
			gradeData.evaluation.recommendations.forEach((rec: string) => {
				if (rec) addWrappedText(`• ${rec}`);
			});
			yPos += 5;
		}

		// Add metrics
		if (gradeData?.metrics) {
			const hasMetrics = Object.values(gradeData.metrics).some(
				(value) => value
			);
			if (hasMetrics) {
				addSectionHeader("Performance Metrics", 16);
				doc.setFontSize(12);
				if (gradeData.metrics.commitQuality)
					addWrappedText(`Commit Quality: ${gradeData.metrics.commitQuality}`);
				if (gradeData.metrics.codeContribution)
					addWrappedText(
						`Code Contribution: ${gradeData.metrics.codeContribution}`
					);
				if (gradeData.metrics.consistency)
					addWrappedText(`Consistency: ${gradeData.metrics.consistency}`);
				yPos += 5;
			}
		}

		// Add detailed feedback
		if (gradeData?.feedback) {
			addSectionHeader("Detailed Feedback", 16);
			addWrappedText(gradeData.feedback);
		}

		// Add commit history section with modern styling
		if (studentData?.commit_history?.length > 0) {
			addSectionHeader("Recent Commit History", 16);
			doc.setFontSize(10);
			studentData.commit_history.slice(0, 5).forEach((commit: any) => {
				if (!commit) return;

				checkNewPage(40);

				// Add commit container
				doc.setFillColor(245, 245, 245);
				doc.roundedRect(margin, yPos, maxWidth, 35, 3, 3, "F");

				// Add commit message
				doc.setFontSize(11);
				doc.setFont("helvetica", "bold");
				const messageLines = doc.splitTextToSize(
					commit.message || "No message",
					maxWidth - 10
				);
				doc.text(messageLines, margin + 5, yPos + 8);

				// Add commit details
				doc.setFontSize(9);
				doc.setFont("helvetica", "normal");
				if (commit.date) {
					doc.text(
						new Date(commit.date).toLocaleString(),
						margin + 5,
						yPos + 20
					);
				}

				// Add commit stats
				if (commit.additions !== undefined) {
					doc.setTextColor(0, 128, 0); // Green for additions
					doc.text(`+${commit.additions}`, margin + 5, yPos + 30);
				}
				if (commit.deletions !== undefined) {
					doc.setTextColor(255, 0, 0); // Red for deletions
					doc.text(`-${commit.deletions}`, margin + 20, yPos + 30);
				}
				doc.setTextColor(0, 0, 0); // Reset color

				yPos += 40;
			});
		}

		// Generate PDF buffer
		const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

		// Return the PDF as a response
		return new NextResponse(pdfBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="grade-report-${
					studentName || "student"
				}.pdf"`,
			},
		});
	} catch (error: any) {
		console.error("Error generating PDF:", error);
		return NextResponse.json(
			{ error: "Failed to generate PDF" },
			{ status: 500 }
		);
	}
};
