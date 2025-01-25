import mongoose, { Schema } from "mongoose";

const teacherSchema  = new Schema(
    {
        teacher_id : {
            type : String
        },
        email : {
            type : String,
            required :true,
            unique : true,
        },
        username : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        projects : {
            type : [String],
        }
    }
);


const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;