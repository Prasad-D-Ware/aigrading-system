import mongoose, { Schema } from "mongoose";

const studentSchema  = new Schema(
    {
        project_id : {
            type : String
        },
        user_id : {
            type : String,
            unique : true,
        },
        github_username : {
            type : String,
            required : true
        },
        github_id : {
            type : String
        },
        grade : {
            type : Object
        },
        profile_url : {
            type : String
        },
        avatar_url : {
            type : String
        },
        total_commits : {
            type : Number
        },
        total_additions : {
            type : Number
        },
        total_deletions : {
            type : Number
        },
        active_days : {
            type : Number
        },
        commit_history : {
            type : [Object]
        },
        languages : {
            type : [String]
        },
        weekly_activity : {
            type : [Object]
        }

    }
);


const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;