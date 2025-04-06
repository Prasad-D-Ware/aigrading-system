"use client";
import React, { useEffect, useState } from "react";
import StudentProfile, {
	StudentData,
	StudentProfileProps,
} from "./StudentProfile";
import { useAuthStore } from "@/store/auth-store";
import StudentProfileSkeleton from "../skeletons/StudentProfileSkeleton";

const StudentInfo = ({ user_id }: { user_id: string }) => {
	const [student, setStudent] = useState<StudentData>();
	const { token } = useAuthStore();
	const [loading, setLoading] = useState(true);

	const fetchStudentData = async () => {
		try {
			const response = await fetch("/api/getstudentinfo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({ user_id }),
			});

			const data: StudentProfileProps = await response.json();
			// console.log(data);
			setStudent(data.student);
			setLoading(false);
		} catch (error: any) {
			console.log("Error fetching Student : ", error.message);
		}
	};

	useEffect(() => {
		if (token) {
			fetchStudentData();
		}
	}, [token]);

	if(loading){
		return <StudentProfileSkeleton />
	}

	return <div>{!loading && student && <StudentProfile student={student} />}</div>;
};

export default StudentInfo;
