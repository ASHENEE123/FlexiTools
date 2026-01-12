const path=require("../Middleware/mergeimg")
const path1=require("path")
const fs=require("fs")

const imgCon=(req,res)=>{
    try{
        const rem=req.del
     const down=req.name
      console.log("file deleted")
      res.render("download",{name:down,url:`/convdownload/${down}`})
      res.on("finish",()=>{
         fs.unlink(rem,(err)=>{
            if (err){
                console.log("err occured",err.message)
            }
            else{
                console.log("file deleted")
            }
         })
      })
}
    catch(err){
        res.send("Server issue")
        console.log("err occured",err.message)
    }
    
}
const imgdown=(req,res)=>{
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
            console.log("file deleted")},10000)
        }

    })
}



const showocr=(req,res)=>{
     const file=req.name
     req.showdata=req.text
     setTimeout(()=>{
        fs.unlink(file,err=>{
        if (err){
            console.log("err occured",err.message)
            return  res.send("file Error Occured")
        }
        else{
            console.log("file sent successfully")
        }
     })})
     res.set("Content-Type","text/html").send(`<p><h2>${req.showdata}</h2></p>`)
}


const merge=(req,res)=>{
    const format=req.img
    res.render("download",{url:`/pdfdownload/${format}`,name:format})
}
const mergedata= function (req,res){
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
            console.log("file deleted")},10000)
        }

    })

}

const merged=(req,res)=>{
   const imgname=req.name
   res.render("download",{url:`/imgdownload/${imgname}`,name:imgname})
}
const mergedimg=(req,res)=>{
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
            console.log("file deleted")},10000)
        }

    })

}

const cropdata=(req,res)=>{
    const name=req.data
    res.render("download",{url:`/cropdownload/${name}`,name:name})

}
const cropshow=(req,res)=>{
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
            console.log("file deleted")},10000)
        }

    })
}
module.exports={imgCon,imgdown,showocr,merge,mergedata,merged,mergedimg,cropdata,cropshow}
