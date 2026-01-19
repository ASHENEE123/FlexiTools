const { name } = require("ejs")
const ser=require("express")
const multer=require("multer")
const path =require("path")
const sharp=require("sharp")
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{
    if(file && file.mimetype.startsWith("image/")){
        cb(null,true)
    }
    else{
        cb(new Error("file format not supported"),false)
    }
}})

async function meta(req,res,next){
     const convert=req.body.brow;
    const filname= (nam,con)=>{const remo=nam.lastIndexOf(".");
        if(remo==-1){return nam}
        else{return `processed_${nam.substring(0,remo)}.${con}`}};
        
    const dest=path.join(__dirname,"destination",filname(req.file.originalname,convert))
    try{
    await sharp(req.file.buffer).toFormat(convert).toFile(dest)
    req.name=filname(req.file.originalname,convert);
    console.log(req.file.originalname)
    console.log(req.name)
    next();
}
    catch(err){
        next(err)
    }
}
module.exports={upload,meta};