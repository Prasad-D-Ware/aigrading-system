import mongoose from "mongoose";

const MONGO_CONNECTION_URL = process.env.MONGODB_URI || "";

const connectDB = async () =>{
    const connectionState = mongoose.connection.readyState;

    if(connectionState == 1){
        console.log("Already Connected");
        return;
    }

    if(connectionState == 2){
        console.log("Connecting...");
        return;
    }

    try{
        await mongoose.connect(MONGO_CONNECTION_URL,{
            dbName:"aigrading",
            bufferCommands : true
        });
        console.log("Database Connected Successfully");
    }catch(error : any){
        console.log("Error",error.message);
        throw Error(error)
    }
}

export default connectDB;