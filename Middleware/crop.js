const ser=require("express")
const sharp=require('sharp')
const multer=require("multer")
const rout=require("path")
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{
    if(file && file.mimetype.startsWith("image/")){
        console.log("file accepted")
        cb(null,true)
    }
    else{
        console.log("file format issue")
        cb(new Error("Only images allowed"),false);
        
    }
}})
async function resize(req,res,next){
    try{
        const file1=req.file.originalname
        const dest=rout.join(__dirname,"destination",file1)
        const height=parseInt(req.body.height,10)
        const width=parseInt(req.body.width,10)
        await sharp(req.file.buffer).resize({height:height,width:width}).toFile(dest)
        req.data=file1
        next();
}
catch(err){
    console.log("err occured",err.message)
}
}
module.exports={upload,resize}
