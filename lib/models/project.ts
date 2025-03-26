import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        project_id : {
            type : String,
            unique : true
        },
        project_name : {
            type : String,
            required : true,
            unique : true
        },
        full_name : {
            type : String,
            unique: true
        },
        project_url : {
            type : String,
            required : true,
            unique : true
        },
        project_creator : {
            type : String,
        },
        description :{
            type :String,
        },
        no_of_contributors : {
            type : Number
        },
        created_at : {
            type : Date
        },
        updated_at : {
            type : Date
        },
        forks : {
            type : String
        },
        stars : {
            type : String
        },
        visibility : {
            type : String
        },
        language : {
            type : String
        },
        contributors : {
            type : [Object]
        },
        projectStats: {
            totalCommits: {
                type : Number
            },
            avgCommits: {
                type : Number
            },
            totalProjectAdditions : {
                type : Number
            }, 
            totalProjectDeletions : {
                type : Number
            }
        },
    }
);


const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;