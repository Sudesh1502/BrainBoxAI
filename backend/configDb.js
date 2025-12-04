import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB);
        console.log("DB connected successfully!");
    }catch(err){
        console.log("Failed to connect with db.\n" +err);
    }
}

export default connectDB;