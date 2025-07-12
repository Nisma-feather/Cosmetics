const Banner = require("../models/Banner");
const mongoose = require("mongoose");
const path=require("path");
const fs=require("fs")

const addBanner = async (req, res) => {
  console.log("trying to create new Banner");
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "image not found" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const newBanner = await Banner.create({ title, description, imageUrl });
    return res
      .status(200)
      .json({ message: "banner successfully updated", newBanner });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

const getBanner=async(req,res)=>{
    try{
      const banners=await Banner.find();
      return res.status(200).json({banner:banners});
    }
    catch(e){
        return res.status(500).json({message:"error in fetching the banners"})
    }
}
const deleteBanner=async(req,res)=>{
    try{
        console.log(req.params.deleteId)
        const ExistingBanner=await Banner.findById(req.params.deleteId);
        if(!ExistingBanner){
            return res.status(404).json({message:"Banner not Found"})
        }
        const image=ExistingBanner.imageUrl;
        if(image){
            const imagePath=path.join(__dirname,"..","uploads",path.basename(image));
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
        }
        await Banner.findByIdAndDelete(req.params.deleteId);
        return res.status(200).json({message:"Banner deleted successfully"});

    }
    catch(e){
        return res.status(500).json({message:"error deleting the banners"});

    }
}
const updateBanner=async(req,res)=>{
    try{
        console.log(req.body)
        const { title, description } = req.body;
        const updatedData = { title, description };
        const Existing=await Banner.findById(req.params.updateId)
        
        if(req.file){
            console.log("The image is described");
            if(Existing.imageUrl){
                const oldPath=path.join(__dirname,"..","uploads",path.basename(Existing.imageUrl));
                if(fs.existsSync(oldPath)){
                    fs.unlinkSync(oldPath)
                }
            }
        updatedData.imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        }
        const updatedBanner=await Banner.findByIdAndUpdate(req.params.updateId,updatedData,{new:true});
        return res.status(200).json({message:"Banner Update Successful",banner:updatedBanner})
    }
    catch(e){

        console.error(e);
        return res
          .status(500)
          .json({ message: "Error updating banner", error: e.message });
    }
}
module.exports = { addBanner,getBanner,deleteBanner,updateBanner };
