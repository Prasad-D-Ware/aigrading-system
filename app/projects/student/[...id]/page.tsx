import ProtectedRoute from "@/components/auth/ProtectedRoute";
import StudentInfo from "@/components/students/StudentInfo";
import React, { use } from "react";

const StudentInfoPage = ({ params }: { params: any }) => {
	const resolvedParams: any = use(params);
	const user_id = resolvedParams.id;
	return (
		<ProtectedRoute>
			<div className="mx-auto max-w-5xl p-3 md:p-10">
				<StudentInfo user_id={user_id} />
			</div>
		</ProtectedRoute>
	);
};

export default StudentInfoPage;
