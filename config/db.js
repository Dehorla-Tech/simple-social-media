import mongoose from "mongoose";

async function connectDB() {
   await mongoose.connect(process.env.MONGO_URI);
    
        console.log("MongoDB connected");
}

export {connectDB};