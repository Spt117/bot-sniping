import mongoose from "mongoose";
const uri: string | undefined = process.env.mongodb;

function connectMongo(): void {
    mongoose.set("strictQuery", false);
    if (!uri) {
        throw new Error("URI is not defined in the environment variables");
    }
    try {
        mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Could not connect to MongoDB", err);
    }
}

export default connectMongo;
