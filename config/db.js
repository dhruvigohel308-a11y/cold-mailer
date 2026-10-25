import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connectionDB = async()=> {
     try{
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is Connected")
     }
     catch(e){
        console.log(e.message)
         
     }
}
export default connectionDB