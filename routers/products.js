const router = require('express').Router();
const {Product, User} = require('../models');
const verifyToken = require('../middleware/verifyToken');
const {createProductValidation, updateProductValidation} = require('../validation');

// get all products
router.get('/', verifyToken, async (req, res) => {
    try{
        const products = await Product.findAll({where: {userId: req.payload.id}});

        return res.status(200).json(products);
    }catch(err){
        return res.status(400).json({error: err})
    }
});

// add new product
router.post('/', verifyToken, async (req, res) => {    
    try{
        // validating request
        const {error} = createProductValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        await Product.create({
            userId: req.payload.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        });

        return res.status(201).json({message: 'Product has been successfully added!'});
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// sellect product by id
router.get('/:id', verifyToken, async (req, res) => {
    try{
        const product = await Product.findAll({where: {id: req.params.id, userId: req.payload.id}});
        if(product.length == 0) return res.status(404).json({error: 'Product with id: ' + req.params.id + ' doesn\'t exists.'});
        res.status(200).json(product[0]);
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// update product
router.put('/:id', verifyToken, async (req, res) => {
    try{
        // check products id in db
        const product = await Product.findAll({where: {id: req.params.id, userId: req.payload.id}});
        if(!product.length) return res.status(404).json({error: 'Product with id: ' + req.params.id + ' doesn\'t exists.'});

        // validating request
        const {error} = updateProductValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        await Product.update(
        {
            name: req.body.name || product[0].name,
            price: req.body.price || product[0].price,
            description: req.body.description || product[0].description,
            imagePath: req.body.imagePath || product[0].imagePath
        },
        {
            where: {
                userId: req.payload.id,
                id: req.params.id
            }
        });

        return res.status(200).json({message: 'Product with id: ' + req.params.id + ' has been updated!'});
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// delete product
router.delete('/:id', verifyToken, async (req, res) => {
    try{
        // check products id in db
        const product = await Product.findAll({where: {userId: req.payload.id, id: req.params.id}});
        if(!product.length) return res.status(404).json({error: 'Product with id: ' + req.params.id + ' doesn\'t exists.'});

        await Product.destroy({
            where: {
                userId: req.payload.id,
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Product with id: ' + req.params.id + ' has been deleted!'})
    }catch(err){
        return res.status(400).json({error: err});
    }
});

module.exports = router;