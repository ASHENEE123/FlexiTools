const ser=require("express")
const PDFMerger=require("pdf-merger-js").default
const pdf=new  PDFMerger();
const path=require("path")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024},fileFilter:(req,file,cb)=>{
    try{
      if(file.mimetype.startsWith("application/pdf")){
        console.log("file accepted")
        cb(null,true);
      }
      else{
        console.log("file not  supported")
        cb(new Error("file not supported"),false);
      }
    }
    catch(err){
        console.log(err);
    }
}})
const dest= path.join(__dirname,"destination")
 async function  pdfmerge(req,res,next){
  req.img=req.files[0].originalname
   if (!req.files || req.files.length === 0) {
            console.log("No files uploaded");
            res.status(404).send("file not uploaded")
        }
 try{
for(let fil of req.files){
  await pdf.add(fil.buffer)
}
req.loc=path.join(dest,req.img)
await pdf.save(req.loc)
next();
 }
 catch(err){
  console.log(err.message)
  res.status(500).send("err occured")
 }
}
module.exports={upload,pdfmerge};
