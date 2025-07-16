const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    shortDescription:{
        type:String,
        required:true }    
        ,
    details:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    images:[
        {
            type:String,
            required:true
        }
    ],
    offer:{
        type:Number,
        default:0,
    },
    inStock:{
        type:Boolean,
        default:true
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

    
})

module.exports=mongoose.model("Product",productSchema);