const Joi=require('joi')


exports.validateProduct=(e)=>{

    const schema=Joi.object({
        
        product_name:Joi.string(),
        category_name:Joi.string(),
        created_by:Joi.string(),
        description:Joi.string(),
        status:Joi.string()
    })
    return schema.validate(e)

}