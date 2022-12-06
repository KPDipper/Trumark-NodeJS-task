const express=require('express')
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct, checkBody, checkUpdateBody, checkID } = require('../controllers/productControllers')

const router=express.Router()

router.route('/').post(checkBody,addProduct).get(getAllProducts)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

module.exports=router