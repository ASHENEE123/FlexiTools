const { name } = require("ejs")
const ser=require("express")
const multer=require("multer")
const path =require("path")
const sharp=require("sharp")
const fs=require("fs").promises
const dest=path.join(__dirname,"destination")
const storage=multer.diskStorage({
destination:(req,file,cb)=>{
    const rout=path.join(__dirname,"../Public")
    cb(null,rout)
},
filename:(req,file,cb)=>{
     const name=`uploaded_${file.originalname}`;
    cb(null,name)
}
})
const upload=multer({storage:storage,fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }
    else{
        cb(new Error("file format not supported"),false)
    }
}})

async function meta(req,res,next){
    const rout=path.join(req.file.destination,req.file.filename)
    const name=req.file.originalname
     const convert=req.body.brow;
    const filname= (nam,con)=>{const remo=name.lastIndexOf(".");
        if(remo==-1){return name}
        else{return `processed_${name.substring(0,remo)}.${convert}`}};
        
    const dest=path.join(__dirname,"destination",filname(name,convert))
    try{
    await sharp(rout).toFormat(convert).toFile(dest)
    req.name=filname(name,convert);
    req.del=rout
    next();
}
    catch(err){
        next(err)
    }
}
module.exports={upload,meta};