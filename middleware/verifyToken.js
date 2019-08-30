const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const {User} = require('../models');

module.exports = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: 'Access denied'});

    try{
        const jwtPayload = jwt.verify(token, config.tokenSecret);
        
        const user = await User.findAll({where: {id: jwtPayload.id, email: jwtPayload.email}});
        if(!user.length) return res.status(400).json({error: 'Invalid token!'});
        
        req.payload = jwtPayload;

        return next();
    }catch(err){
        return res.status(400).json({error: 'Invalid token!'});
    }
}