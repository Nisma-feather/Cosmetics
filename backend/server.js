const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const path=require("path")
require("dotenv").config();

//Routes Import
const bannerRoutes=require("./routes/bannerRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const productRoutes=require("./routes/productRoutes");

const app=express();
app.use(cors());
app.use(express.json());

//servig stativ files
const UploadDir=path.join(__dirname,"uploads")
app.use("/uploads",express.static(UploadDir))

//Routing
app.use("/api/banner", bannerRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes)

//database connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MONGODB CONNECTED")
}).catch((e)=>{
  console.log("error connecting to database",e)
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on the port 8000")
})