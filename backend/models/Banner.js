const mongoose=require('mongoose')

const bannerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("Banner",bannerSchema)