const ser=require("express")
const sharp=require('sharp')
const multer=require("multer")
const rout=require("path")
let date=new Date()
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024},fileFilter:(req,file,cb)=>{
    console.log(file.mimetype)
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}})

async function merimg(req,res,next){
    const dest=rout.join(__dirname,"destination",`merged_${req.files[0].originalname}`)
    const file1= await sharp(req.files[0].buffer).metadata();
    const file2= await sharp(req.files[1].buffer).metadata();
    let background,forward;
    if (file2.width <= file1.width && file2.height <= file1.height) {
    background = req.files[0].buffer;
    forward = req.files[1].buffer;
    }
    else{
      background=req.files[1].buffer
        forward=req.files[0].buffer
    }
    try{
       await sharp(background).composite([{
        input:forward,
        top:10,
        left:10
    }])
    .toFile(dest)
    console.log("filed stored")
    req.name=`merged_${req.files[0].originalname}`
   next()
}
catch(err){
    console.log(`err occured ${err.message}`)
    next(err)
}
}
module.exports={upload,merimg};