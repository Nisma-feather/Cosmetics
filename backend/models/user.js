const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Address:[{
        type:String,
    }],
    cart:[
        {
            product:{type: mongoose.Schema.Types.ObjectId,
                     ref:'Product'
            },
            quantity:{
                type:Number,
                default:1
            }


        }
    ]
    ,
    role:{
        type:String,
        enum:["user",'admin'],
        default:'user'
    },
    accountCretedAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('User',userSchema)