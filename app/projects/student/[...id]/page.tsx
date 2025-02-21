import StudentInfo from '@/components/students/StudentInfo';
import React, { use } from 'react'

const StudentInfoPage = ({ params }: { params: any }) => {
  const resolvedParams : any = use(params)
  const user_id = resolvedParams.id;
  return (
    <div className='mx-auto max-w-5xl p-3 md:p-10'>
      <StudentInfo user_id={user_id} />
    </div>
  )
}

export default StudentInfoPage;
