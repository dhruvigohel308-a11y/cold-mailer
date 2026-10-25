import cloudinary from "../config/cloud.config.js"
import User from "../model/auth.model.js"
import File from "../model/file.model.js"

export const uploadFile=async(req,res)=>{
    try{
        if(!req.file){
            return res.send.status(401).json({
                success:false,
                msg:"File is Required..."
            })
        }
        const {fileName}=req.body
        if(!fileName){return res.send.status(400).json({
                success:false,
                msg:"File name is Required..."
            })}
            const result=await new Promise((resolve,reject)=>{
                const stream =cloudinary.uploader.upload_stream(
                    {
                        folder:"files",
                        resource_type:"auto"
                    },
                   (error,result)=>{
                    if(error){
                        return reject(error)
                    }
                    else{
                        return resolve(result)
                    }
                   }
                )
                stream.end(req.file.buffer)
            })
            const file=await File.create({
                fileName,
                fileURL:result.secure_url,
                createdBy:req.user._id


            })
            await User.findByIdAndUpdate(req.user._id,{
                $push:{
                    files : file._id
                }
                
            })
            return res.status(201).json({
                success : true,
                msg : "File Uploaded Successfully....",
                file
            })
            
    }
    catch(error){
        console.log("File Upload Error:",error.message)
        return res.status(500).json({
                success : false,
                msg : "Internal Server Error",
                
            })

    }
}