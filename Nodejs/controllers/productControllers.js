const Product = require("../models/productModel");
const mongoose=require('mongoose');
const { validateProduct } = require("../validation/productValidation");
const { off } = require("../models/productModel");

// const counterSchema=new mongoose.Schema({

//     id:{
//         type:String
//     },
//     seq:{
//         type:Number
//     }
// })

// const Counter=mongoose.model('Counter',counterSchema)


exports.addProduct=async(req,res)=>{

    try{

        //  let a= await Counter.findOneAndUpdate(
        //     {id:'autoval'},
        //     {"$inc":{"seq":1}},
        //     {new:true},async(err,cd)=>{

        //         let seqId;
        //         if(cd==null){
        //              const newVal=await Counter.create({id:'autoval',seq:1})
        //             seqId=1
                    
        //         }


        //     }
        // )
 
         const addProd=await Product.create(req.body)

        res.status(200).json({
            status:"SUCCESS",
            data:{
                addProd
            }
        })
    }

    catch(err){
        //  const {error}=validateProduct(req.body)
        res.status(404).json({
            status:"FAIL;",
            message:err.message,
            // validationError:error.details[0].message || null
        })

    }
}


exports.checkBody=(req,res,next)=>{

  if(!req.body.product_name||!req.body.category_name ||!req.body.created_by||!req.body.description||!req.body.status){
        return res.status(401).json({
            staus:'FAIL',
            message:"Incomplete Credentials"
        })
    }else if(!req.body.product_name.match(/^[A-Za-z]/) || !req.body.category_name.match(/^[A-Za-z]/) || !req.body.created_by.match(/^[A-Za-z]/)){
        return res.status(401).json({
            staus:'FAIL',
            message:"Product,Category & created by should not contain any number."
        })
    }
    
    next()
}

// exports.checkUpdateBody=(req,res,next)=>{
//     if(!Product.product_name.match(/^[A-Za-z]/)){
//         return res.status(401).json({
//             staus:'FAIL',
//             message:"Product,Category & created by should not contain any number."
//         })
//     }
    
//     next()
// }

exports.getAllProducts=async(req,res)=>{

    try{
        const queryObj={...req.query}
        console.log("queryObj",queryObj)
        console.log("req.query",req.query)
        const excludedFileds=['pages','sort','limit','fields']
         excludedFileds.forEach(el=>delete queryObj[el])

         //advance filtering:
         let queryStr=JSON.stringify(queryObj)
         queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
         console.log("queryStr",queryStr)

         let query=Product.find(JSON.parse(queryStr))

         //2.SORTING:
           //sort('price,duration')http://localhost:5000/api/v1/tours?sort=price,durations
            //here first we sort on price then if two object has same prie then we sort against durations
            //for descening order all we need to do is ?sort=-price 
         if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ')
            console.log("sortBy",sortBy)
            query=query.sort(sortBy)
         }else{
            query=query.sort(' -updatedAt -createdAt')//here newly created prdouct will appear first if sort query not found on URL.
         }

         //3.Fields,selecting
         if(req.query.fields){

            const fields=req.query.fields.split(',').join(' ')
            query=query.select(fields)
         }
         else{
            query=query.select('-__v')
         }

         //3.PAGINATION:
         //page=2&limit=10, 1-10 page 1, 11-20 page 2 
         //execute query
         //if page was 3 then we have to skip(20)

          const page=parseInt(req.query.page) || 1
          const limit=parseInt(req.query.limit) || 100
          const skip=(page-1)*limit
           query=query.skip(skip).limit(limit)
          
        //    http://localhost:5000/api/v1/products?page=2&limit=4
         if(req.query.page){
            let newquery=await Product.countDocuments()
            if(skip>=newquery){
                throw new Error('This page does not exist')
            }
         }


        const getAllProd=await query
        // Product.find().select('-__v')
        res.status(200).json({
            

            status:"SUCCESS",
            result: getAllProd.length,
            data:{
                getAllProd
            }
        })
    }
    catch(err){
       
        res.status(404).json({
            status:"FAIL",
            message:err.message
        })
    }
}

exports.getProduct=async(req,res)=>{
    try{
        const getProd=await Product.findById(req.params.id).select('-__v')
        res.status(200).json({

            staus:"SUCCESS",
            data:{
                getProd
            }
        })
    }
    catch(err){
        res.status(404).json({
            status:"FAIL",
            message:err.message
        })
    }
}

exports.updateProduct=async(req,res)=>{
    try{
        const updateProd=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:"SUCCESS",
            data:{
                updateProd
            }
        })
    }
    catch(err){
     
        res.status(404).json({
            status:"FAIL",
            message:err.message
        })
    }
}

exports.deleteProduct=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "SUCCESS",
            data:"Successfully deleted"
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'FAIL',
            message: err.message
        })
    }
}