const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const {loginValidation, registerValidation, updateUsersValidation} = require('../validation');
const verifyToken = require('../middleware/verifyToken');

// register user
router.post('/register', async (req, res) => {    
    try{
        // validate request
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const emailExist = await User.findAll({where: {email: req.body.email}});
        if(emailExist.length > 0) return res.status(200).json({error: 'Use another email, the email already registered!'});

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 

        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName || null,
            email: req.body.email,
            password: hashedPassword,
            isActive: req.body.isActive || 'active',
            role: req.body.role || 'member',
            imagePath: req.body.imagePath || null,
            address: req.body.address || null,
            phone: req.body.phone || null,
            latitude: req.body.latitude || null,
            longitude: req.body.longitude || null,
        });
        return res.status(201).json({message: 'User successfully successfully added!'});
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err});
    }
});

// get all user
router.get('/', async (req, res) => {
    try{
        const user = await User.findAll({
            include: ['products', 'carts']
        });
        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({error: err})
    }
});

// login user
router.post('/login', async (req, res) => {
    try{
        // validate the request
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        // check the email
        const user = await User.findAll({where: {email: req.body.email}});
        if(user.length == 0) return res.status(404).json({error: 'Email is not registered!.'});

        // check the password
        const validPassword = await bcrypt.compare(req.body.password, user[0].password);
        if(!validPassword) return res.status(400).json({error: 'Invalid password!.'});

        // generate and assign token
        const token = jwt.sign({id: user[0].id, email: user[0].email}, config.tokenSecret);

        res.status(200).header('auth-token', token).json({
            message: 'Login success!',
            token: token
        });
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// select user by id
router.get('/:id', verifyToken, async (req, res) => {
    try{
        if(req.params.id != req.payload.id) return res.status(400).json({error: 'Access denied! request params id  with token payload id not match!'});

        const user = await User.findAll({
            where: {id: req.params.id},
            include: ['products', 'carts']
        });
        if(user.length == 0) return res.status(404).json({error: 'User with id: ' + req.params.id + ' doesn\'t exists.'});
        res.status(200).json(user[0]);
    }catch(err){
        return res.status(400).json({error: err});
    }
});

// update users
router.put('/:id', verifyToken, async (req, res) => {
    try{
        if(req.params.id != req.payload.id) return res.status(400).json({error: 'Access denied! request params id  with token payload id not match!'});

        const user = await User.findAll({where: {id: req.params.id}});
        if(!user.length) return res.status(404).json({error: 'User with id: ' + req.params.id + ' doesn\'t exists.'});
        
        // validate request
        const {error} = updateUsersValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        let password = req.body.password?req.body.password:user[0].password;

        // hashing password
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }

        await User.update(
        {
            firstName: req.body.firstName || user[0].firstName,
            lastName: req.body.lastName || user[0].lastName,
            email: req.body.email || user[0].email,
            password: password,
            isActive: req.body.isActive || user[0].isActive,
            role: req.body.role || user[0].role,
            imagePath: req.body.imagePath || user[0].imagePath,
            address: req.body.address || user[0].address,
            phone: req.body.phone || user[0].phone,
            latitude: req.body.latitude || user[0].latitude,
            longitude: req.body.longitude || user[0].longitude
        },
        {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({message: 'User with id: ' + req.params.id + ' successfully updated!'});
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err});
    }
});

// delete users
router.delete('/:id', verifyToken, async (req, res) => {
    try{
        // check user id in db
        const user = await User.findAll({where: {id: req.params.id}});
        if(!user.length) return res.status(404).json({error: 'User with id: ' + req.params.id + ' doesn\'t exists.'});

        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Users with id: ' + req.params.id + ' successfully deleted!'});
    }catch(err){
        return res.status(400).json({error: err});
    }
});

module.exports = router;