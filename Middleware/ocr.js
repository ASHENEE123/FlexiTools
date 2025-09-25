const exp=require("express")
const tesseract=require("tesseract.js")
const multer=require("multer")
const path=require("path")
const fs=require("fs").promises
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const dest=path.join(__dirname,"destination")
        cb(null,dest)
    },
    filename:(req,file,cb)=>{
        const filename=file.fieldname;
        cb(null,filename)
    }
})
const upload=multer({storage:storage,limits:5*1024*1024,fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }
    else{
        cb(err,false)
    }
}})
async function ocr(req,res,next){
    try{
   const path=req.file.path;
   const lang="eng"
   const replay=await tesseract.recognize(path,lang,{logger:(event)=>{
     console.log(event)
   }})
   req.text=replay.data.text
   req.name=path;
   next();}
   catch(err){
    console.log("err occured")
    next(err)
   }
}
module.exports={upload,ocr};