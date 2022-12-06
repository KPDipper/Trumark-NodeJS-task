const express=require('express')
const app=express()

const morgan=require('morgan')

const prodRouter=require('./routes/productRoutes')
 

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/products',prodRouter)

module.exports=app