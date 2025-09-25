const ser = require("express");
const path = require("path");
const app = ser();
const errhandler=(err,req,res,next)=>{
 console.log(err.stack)
 res.status(500).json("server Error")
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,"templates"));
const rout = require("./routes/image_to_desired_format");
app.use(rout);
app.use(errhandler)
app.listen(3000, (err) => {
    if (err) throw err;
    console.log("success");
});
