import connectDB from "@/lib/db";
import Student from "@/lib/models/student";
import { NextResponse } from "next/server";

export const POST = async (req : Request) =>{
    const { user_id } = await req.json();

    if(!user_id){
        return NextResponse.json({
            msg : "No user id provided!"
        })
    }
try {
    
    await connectDB();

    const student = await Student.findOne({
        user_id : user_id
    },{
        _id:0,
        __v:0
    })


    if(!student){
        return NextResponse.json({
            msg : "Student Not Found!"
        })
    }

    return NextResponse.json({
        student
    })


} catch (error : any) {
    console.log("Error getting student contributors : ", error.message);
    return NextResponse.json({
        msg : "Error getting student contributors : " + error.message
    })
}
}