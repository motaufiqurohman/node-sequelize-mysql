const router = require('express').Router();
const {Product, User, Cart} = require('../models');
const verifyToken = require('../middleware/verifyToken');
const {createCartValidation, updateCartValidation} = require('../validation');

// get all carts
router.get('/', verifyToken, async (req, res) => {
    try{
        const cart = await Cart.findAll({
            include: ['product'],
            where: {userId: req.payload.id}
        });
        return res.status(200).json(cart);
    }catch(err){
        return res.status(400).json({error: err})
    }
});

// add new cart
router.post('/', verifyToken, async (req, res) => {    
    try{
        // validate the request
        const {error} = createCartValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        // check product id is exist
        const product = await Product.findAll({where: {id: req.body.productId}});
        if(!product.length) return res.status(404).json({error: 'Product with id: ' + req.body.productId + ' doesn\'t exists!'});

        // check simillar cart 
        const cart = await Cart.findAll({where: {userId: req.payload.id, productId: req.body.productId}});
        if(cart.length) return res.status(400).json({error: 'Cart with product id: ' + req.body.productId + ' is already exist!, if you want to update the cart, please use update route!'});

        // check req body of quantity
        if(req.body.quantity <= 0) return res.status(400).json({error: 'Cart quantity must be at least 1!'});

        await Cart.create({
            userId: req.payload.id,
            productId: req.body.productId,
            quantity: req.body.quantity
        });

        return res.status(201).json({message: 'Cart has been successfully added!'});
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// select cart by id
router.get('/:id', verifyToken, async (req, res) => {
    try{
        const cart = await Cart.findAll({where: {userId: req.payload.id, id: req.params.id}});
        if(cart.length == 0) return res.status(404).json({error: 'Cart with id: ' + req.params.id + ' doesn\'t exists.'})
        res.status(200).json(cart[0]);
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// update cart
router.put('/:id', verifyToken, async (req, res) => {
    try{
        // validate the request
        const {error} = updateCartValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const cart = await Cart.findAll({where: {userId: req.payload.id, id: req.params.id}});
        // check cart id in db
        if(!cart.length) return res.status(404).json({error: 'Cart with id: ' + req.params.id + ' doesn\'t exists!'})

        // check req body of quantity
        if(req.body.quantity <= 0) return res.status(400).json({error: 'Cart quantity must be at least 1!'});

        await Cart.update(
        {
            userId: req.payload.id,
            productId: cart[0].productId,
            quantity: req.body.quantity
        },
        {
            where: {
                userId: req.payload.id,
                id: req.params.id
            }
        });

        return res.status(200).json({message: 'Cart with id: ' + req.params.id + ' has been updated!'});
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// delete cart
router.delete('/:id', verifyToken, async (req, res) => {
    try{
        // check cart id in db
        const cart = await Cart.findAll({where: {userId: req.payload.id, id: req.params.id}});
        if(!cart.length) return res.status(404).json({error: 'Cart with id: ' + req.params.id + ' doesn\'t exists.'});

        await Cart.destroy({
            where: {
                userId: req.payload.id,
                id: req.params.id
            }
        });

        res.status(200).json({message: 'Cart with id: ' + req.params.id + ' has been deleted!'})
    }catch(err){
        return res.status(400).json({error: err});
    }
});

module.exports = router;