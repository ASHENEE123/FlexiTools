const express = require("express");
const route = express.Router();
const middle = require("../Middleware/imgConv.js");
const mid = require("../Middleware/merge.js");
const mer = require("../Middleware/mergeimg.js");
const cropped = require("../Middleware/crop.js");
const control = require("../Controller/control.js");
const data=require("../Middleware/ocr.js")

route.get("/home",(req,res)=>{
 res.render("homepage")
})

route.get("/Convert", (req,res)=>{res.render("imageconv")});
route.post("/upload", middle.upload.single("uploaded_file"),middle.meta,control.imgCon);
route.get("/convdownload/:filename",control.imgdown)

route.get("/ocr",(req,res)=>{res.render("ocr")})
route.post("/image",data.upload.single("uploaded_file"),data.ocr,control.showocr)

route.get("/merge",(req,res)=>{res.render("merge")})
route.post("/com",mid.upload.array("uploaded_file",2),mid.pdfmerge,control.merge)
route.get("/pdfdownload/:filename",control.mergedata)

route.get("/mergeimg",(req,res)=>{res.render("mergeimg")})
route.post("/show",mer.upload.array("uploaded_file",2),mer.merimg,control.merged)
route.get("/imgdownload/:filename",control.mergedimg)


route.get("/crop",(req,res)=>{res.render("crop")})
route.post("/resize",cropped.upload.single("file"),cropped.resize,control.cropdata)
route.get("/cropdownload/:filename",control.cropshow)

module.exports = route;
