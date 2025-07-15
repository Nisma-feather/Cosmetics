const mongoose=require("mongoose");

const Product=require("../models/Product");
const { options } = require("../routes/categoryRoutes");

const addProduct=async(req,res)=>{
    try{
        const newproductData = req.body;
        const images=[];
        if(req.files && req.files.length>0){
            req.files.forEach((file)=>{
                images.push(`${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
            })
        }
        const newProduct=await Product.create({...newproductData,images});
        return res.status(201).json({messages:"Product Created Successfully",newProduct});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"can't able to create the Product"})

    }
}

const getProduct=async(req,res)=>{
    try{
          const {category,search,sort}=req.query;
          const limit=parseInt(req.query.limit) || 5;
          const page=parseInt(req.query.page) || 1;
          const skip=(page-1)*limit;
        const query={};
        const sortOption={};


        if(category){
            query.category=category
        }
        if(search){
            query.name={$regex:search,options:"i"}
        }
        if(sort==="highToLow"){
            sortOption.price=-1

        }
        if(sort==='lowToHigh'){
            sortOption.price=1
        }
        const productsFound=await Product.countDocuments(query);
        const totalPages=Math.ceil(productsFound/limit)

        const products=await Product.find(query).populate('category','name').sort(sortOption).skip(skip).limit(limit);
        return res.status(200).json({products,pagination:{productsFound,totalPages,currentPage:page,pageSize:limit}})


    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"cant able to get the products"})

    }

}



module.exports={addProduct,getProduct};