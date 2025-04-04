// "use client"
// import StudentCard from '@/components/students/StudentCard';
// import React, { useEffect, useState } from 'react'

// const ProjectDetailsPage = async (context : {params : any}) => {

//   const [contributors,setContributors] = useState([{}]);

//   const project_id = context.params.project_id;

//   const fetchStudents = async() =>{
//     try{
//       const response = await fetch("/api/getprojectstudents",{
//         method : "POST",
//         headers : {
//           "Content-Type" : "application/json",
//         },
//         body : JSON.stringify({project_id})
//       })

//       const { contributors } = await response.json();

//       console.log(contributors);
//       setContributors(contributors);
//     }catch(error : any){
//       console.log(error.message);
//     }
//   }

//   useEffect(()=>{
//     fetchStudents();
//   },[])

//   return (
//     <div className='mx-auto max-w-5xl'>
//       {contributors.map((contributor)=>{
//         return <StudentCard {...contributor}/>
//       })}
//     </div>
//   )
// }

// export default ProjectDetailsPage

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { use } from "react";

const ProjectDetailsPage = ({ params }: { params: any }) => {
	const resolvedParams: any = use(params);
	const project_id = resolvedParams.project_id;

	return (
		<>
			<ProtectedRoute>
				<ProjectDetails project_id={project_id} />
			</ProtectedRoute>
		</>
	);
};

export default ProjectDetailsPage;
