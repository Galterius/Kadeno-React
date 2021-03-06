const Joi = require('joi')

const listingSchima = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
})

module.exports.listingSchima = listingSchima;