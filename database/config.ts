import mongoose from "mongoose";

export const connectToDatabase = async():Promise<void> =>{
try {
    const url = process.env.DB_URL;
    if(!url){
        throw new Error("No database url provided");
    }
    await mongoose.connect(url);
    console.log("Connected to database")
} catch (error) {
    throw new Error (error as string);
}
}