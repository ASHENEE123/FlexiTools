const path=require("../Middleware/mergeimg")
const path1=require("path")
const fs=require("fs")

// Image Conversion
const imgCon=(req,res)=>{
    try{
     const down=req.name
      res.render("download",{name:down,url:`/convdownload/${down}`})
}
    catch(err){
        res.send("Server issue")
        console.log("err occured",err.message)
    }
    
}
const imgdown=(req,res)=>{
    try{
    const fill=req.params.filename
    const comppath=path1.join(__dirname,"../Middleware/destination",fill)
    res.download(comppath)
    console.log("file sent succesfully")
    res.on("finish",(err)=>{
        if (err) {
            console.log(err.message)
        }
        else{
            setTimeout(()=>{
            fs.unlinkSync(comppath)
            console.log("file deleted")},60*60*1000)
        }

    })}
    catch(err){
        console.log("err occured",err.message)
        res.send("server error pls try later")
    }
}


// Ocr Extraction
const showocr=(req,res)=>{
     req.showdata=req.text
     if(req.showdata){
         res.set("Content-Type","text/html").send(`<h3>${req.showdata}</h3>`)
     console.log("data sent")
     }
     else{
    console.log("data not sent")
        res.send("server issue pls try after sometime")}
}

//Merge Pdf
const merge=(req,res)=>{
    const format=req.img
    if(format){
    res.render("download",{url:`/pdfdownload/${format}`,name:format})
}
else{
res.send("server issue pls try later")}
}
const mergedata= function (req,res){
    try{
    const name=req.params.filename
    const compath=path1.join(__dirname,"../Middleware/destination",name)
    res.download(compath)
    console.log("pdf merged succesfully")
res.on("finish",(err)=>{
        if (err) {
            console.log(err.message)
        }
        else{
            setTimeout(()=>{
            fs.unlinkSync(compath)
            console.log("file deleted")},60000)
        }

    })}
    catch(err){
        console.log("err occured",err.message)
        res.send("file not exist pls try later")
    }

}

//Merge Image
const merged=(req,res)=>{
   const imgname=req.name
   res.render("download",{url:`/imgdownload/${imgname}`,name:imgname})
}
const mergedimg=(req,res)=>{
    try{
const param=req.params.filename
const loc=path1.join(__dirname,"../Middleware/destination",param)
    res.download(loc)
     console.log("file sent succesfully")
res.on("finish",(err)=>{
        if (err) {
            console.log(err.message)
        }
        else{
            setTimeout(()=>{
            fs.unlinkSync(loc)
            console.log("file deleted")},60000)
        }

    })}
    catch(err){
        console.log("err occured",err.message)
        res.send("server error pls try later")
    }

}


//Crop Image
const cropdata=(req,res)=>{
    const name=req.data
    res.render("download",{url:`/cropdownload/${name}`,name:name})

}
const cropshow=(req,res)=>{
    try{
 const para=req.params.filename
 const compath=path1.join(__dirname,"../Middleware/destination",para)
    res.download(compath)
    console.log("file sent")
    res.on("finish",(err)=>{
        if (err) {
            console.log(err.message)
        }
        else{
            setTimeout(()=>{
            fs.unlinkSync(compath)
            console.log("file deleted")},60000)
        }

    })}
    catch(err){
        console.log("err occured",err.message)
        res.send("server error pls try later")
    }
}
module.exports={imgCon,imgdown,showocr,merge,mergedata,merged,mergedimg,cropdata,cropshow}
