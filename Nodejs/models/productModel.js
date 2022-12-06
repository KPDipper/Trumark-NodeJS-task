const mongoose=require('mongoose')


const productSchema=new mongoose.Schema({

    product_name:{
        type:String,
        required:[true,"Product name must be given"],
        trim:true,
        minLength:[5,"Product Name should atleast be 5 characters"],
        maxLength:[20,"Product Name shouldn't exceed 300 characters."],
        unique:[true,"All Products should have unique name."]
    },
    category_name:{
        type:String,
        required:[true,"Category Name must be given"],
        minLength:[5,"Category Name should atleast be 5 characters"],
        maxLength:[20,"Category Name shouldn't exceed 300 characters."],
        trim:true
      
    },
    description:{
        type:String,
        required:[true," Description must be given"],
        trim:true,
        minLength:[5,"Description should atleast be 5 characters"],
        maxLength:[300,"Description shouldn't exceed 300 characters."]
    },
    created_by:{
        type:String,
        required:[true," Description must be given"],
        trim:true
    },
    status:{
        type:String,
        trim:true,
        enum:{
            values:['in stock','out off stock'],
            message:'status must be in (in stock & out off stock)'
        },
        required:[true,'A product must have a status ']

    }
},{
    timestamps:true
})
const Product=mongoose.model('Product',productSchema)

module.exports=Product

