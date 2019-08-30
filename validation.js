const Joi = require('@hapi/joi');

// users register
const registerValidation = (req) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().allow(["", null]).min(3),
        email: Joi.string().required().email({minDomainSegments: 2}).min(8),
        password: Joi.string().required().min(6),
        isActive: Joi.string().allow(["", null]).valid(['active', 'pending', 'deleted']).required(),
        role: Joi.string().allow(["", null]).valid(['member', 'admin']).required(),
        imagePath: Joi.string().allow(["", null]).min(3).required(),
        address: Joi.string().allow(["", null]).min(8).required(),
        phone: Joi.string().allow(["", null]).min(10).max(14).required(),
        latitude: Joi.string().allow(["", null]).min(3).max(20).required(),
        longitude: Joi.string().allow(["", null]).min(3).max(20).required()
    });
    return schema.validate(req);
};

// users login
const loginValidation = (req) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(req);
};

// users update
const updateUsersValidation = (req) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().allow([""], null).min(3).required(),
        lastName: Joi.string().allow(["", null]).min(3).required(),
        email: Joi.string().allow([""], null).email({minDomainSegments: 2}).min(8).required(),
        password: Joi.string().allow([""], null).min(6).required(),
        isActive: Joi.string().allow(["", null]).valid(['active', 'pending', 'deleted']).required(),
        role: Joi.string().allow(["", null]).valid(['member', 'admin']).required(),
        imagePath: Joi.string().allow(["", null]).min(3).required(),
        address: Joi.string().allow(["", null]).min(8).required(),
        phone: Joi.string().allow(["", null]).min(10).max(14).required(),
        latitude: Joi.string().allow(["", null]).min(3).max(20).required(),
        longitude: Joi.string().allow(["", null]).min(3).max(20).required()
    });
    return schema.validate(req);
};

// create product
const createProductValidation = (req) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(2),
        price: Joi.string().required().min(4).max(20),
        description: Joi.string().required().allow(["", null])
    });
    return schema.validate(req);
};

// update product
const updateProductValidation = (req) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(2).allow(["", null]),
        price: Joi.string().required().min(4).max(20).allow(["", null]),
        description: Joi.string().required().allow(["", null])
    });
    return schema.validate(req);
}

// create cart
const createCartValidation = (req) => {
    const schema = Joi.object().keys({
        productId: Joi.number().required(),
        quantity: Joi.number().required()
    });
    return schema.validate(req);
};

// update cart
const updateCartValidation = (req) => {
    const schema = Joi.object().keys({
        quantity: Joi.number().required().allow(["", null])
    });
    return schema.validate(req);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateUsersValidation = updateUsersValidation;
module.exports.createProductValidation = createProductValidation;
module.exports.updateProductValidation = updateProductValidation;
module.exports.createCartValidation = createCartValidation;
module.exports.updateCartValidation = updateCartValidation;
