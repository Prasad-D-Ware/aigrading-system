"use client";
import React, { useEffect, useState } from "react";
import StudentProfile, {
	StudentData,
	StudentProfileProps,
} from "./StudentProfile";
import { useAuthStore } from "@/store/auth-store";

const StudentInfo = ({ user_id }: { user_id: string }) => {
	const [student, setStudent] = useState<StudentData>();
	const { token } = useAuthStore();

	const fetchStudentData = async () => {
		try {
			const response = await fetch("/api/getstudentinfo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization : "Bearer " + token
				},
				body: JSON.stringify({ user_id }),
			});

			const data: StudentProfileProps = await response.json();
			// console.log(data);
			setStudent(data.student);
		} catch (error: any) {
			console.log("Error fetching Student : ", error.message);
		}
	};

	useEffect(() => {
		fetchStudentData();
	}, []);

	return <div>{student && <StudentProfile student={student} />}</div>;
};

export default StudentInfo;
