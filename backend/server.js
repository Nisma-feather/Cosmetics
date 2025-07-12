const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const path=require("path")
require("dotenv").config();
const adminRoutes=require("./routes/adminRoutes")

const app=express();
app.use(cors());
app.use(express.json());

//servig stativ files
const UploadDir=path.join(__dirname,"uploads")
app.use("/uploads",express.static(UploadDir))

//
app.use("/api",adminRoutes)

//database connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MONGODB CONNECTED")
}).catch((e)=>{
  console.log("error connecting to database",e)
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on the port 8000")
})