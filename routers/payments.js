// const router = require('express').Router();
// const {User, Cart, Payment} = require('../models');
// const verifyToken = require('../middleware/verifyToken');
// const {currentTime, expiredTime, generateCodePayment, checkExpiredTime} = require('../helper/time');

// // get all payment
// router.get('/', verifyToken, async (req, res) => {
//     try{
//         // check the email and id is match
//         const {email, id} = req.payloadToken;
//         const user = await User.findAll({
//             where: {id: id}
//         });
//         if(user.length == 0) return res.status(400).json({error: 'Invalid token!'});
//         if(user[0].email != email) return res.status(400).json({error: 'Invalid token!'});

//         const payment = await Payment.findAll({
//             where: {userId: id}
//         });
//         return res.status(200).json(payment);
//     }catch(err){
//         console.log(err)
//         return res.status(400).json({error: err})
//     }
// });

// // get a payment by id
// router.get('/:id', verifyToken, async (req, res) => {
//     try{
//         // check the email and id is match
//         const {email, id} = req.payloadToken;
//         const user = await User.findAll({where: {id: id}});
//         if(user.length == 0) return res.status(400).json({error: 'Invalid token!'});
//         if(user[0].email != email) return res.status(400).json({error: 'Invalid token!'});

//         const payment = await Payment.findAll({where: {userId: id, id: req.params.id}});
//         if(payment.length == 0) return res.status(404).json({error: 'Payment with id: ' + req.params.id + ' doesn\'t exists.'})
//         res.status(200).json(payment[0]);
//     }catch(err){
//         return res.status(400).json({error: err});
//     }
// });

// // add new payment
// router.post('/', verifyToken, async (req, res) => {    
//     try{
//         // check the email and id is match
//         const {email, id} = req.payloadToken;
//         const user = await User.findAll({where: {id: id}});
//         if(user.length == 0) return res.status(400).json({error: 'Invalid token!'});
//         if(user[0].email != email) return res.status(400).json({error: 'Invalid token!'});

//         const paymentCode = id.toString() + generateCodePayment();
//         const dateCheckout = currentTime();
//         const paymentExpiredIn = expiredTime(1);

//         let data = [];
//         let i = 0;
//         for(let obj of req.body){
//             const sumPrice = obj.product.price * obj.quantity;

//             data[i] = {
//                 userId: id,
//                 productId: obj.productId,
//                 quantity: obj.quantity,
//                 sumPrice: sumPrice,
//                 paymentCode: paymentCode,
//                 dateCheckout: dateCheckout,
//                 paymentExpiredIn: paymentExpiredIn,
//                 datePayment: null,
//                 statusPayment: 'on proccess'
//             }
//             i++;
//         }

//         await Payment.bulkCreate(data);

//         return res.status(201).json({message: 'Payment has been successfully added!'});
//     }catch(err){
//         console.log(err)
//         return res.status(400).json({error: err});
//     }
// });

// // update cart
// router.put('/:paymentCode', verifyToken, async (req, res) => {
//     try{
//         // check the email and id is match
//         const {email, id} = req.payloadToken;
//         const user = await User.findAll({where: {id: id}});
//         if(user.length == 0) return res.status(400).json({error: 'Invalid token!'});
//         if(user[0].email != email) return res.status(400).json({error: 'Invalid token!'});

//         const payment = await Payment.findAll({where: {userId: id, paymentCode: req.params.paymentCode}});
//         // check payment id in db
//         if(!payment.length) return res.status(404).json({error: 'Payment with paymentCode: ' + req.params.paymentCode + ' doesn\'t exists!'});

//         const isExpired = checkExpiredTime(payment[0].paymentExpiredIn);
//         if(!isExpired) return res.status(400).json({error: 'Payment expired!'});

//         if(payment[0].statusPayment == req.body.statusPayment) return res.status(400).json({error: 'Payment status already ' + req.body.statusPayment + '!'});

//         await Payment.update(
//         {
//             statusPayment: req.body.statusPayment,
//             datePayment: currentTime()
//         },
//         {
//             where: {
//                 userId: id,
//                 paymentCode: req.params.paymentCode
//             }
//         });

//         return res.status(200).json({message: 'Cart with id: ' + req.params.paymentCode + ' has been updated!'});
//     }catch(err){
//         return res.status(400).json({error: err});
//     }
// });

// // delete cart
// router.delete('/:id', verifyToken, async (req, res) => {
//     try{
//         // check the email and id is match
//         const {email, id} = req.payloadToken;
//         const user = await User.findAll({where: {id: id}});
//         if(user.length == 0) return res.status(400).json({error: 'Invalid token!'});
//         if(user[0].email != email) return res.status(400).json({error: 'Invalid token!'});

//         // check cart id in db
//         const cart = await Cart.findAll({where: {userId: id, id: req.params.id}});
//         if(!cart.length) return res.status(404).json({error: 'Cart with id: ' + req.params.id + ' doesn\'t exists.'});

//         await Cart.destroy({
//             where: {
//                 userId: id,
//                 id: req.params.id
//             }
//         });

//         res.status(200).json({message: 'Cart with id: ' + req.params.id + ' has been deleted!'})
//     }catch(err){
//         return res.status(400).json({error: err});
//     }
// });

// module.exports = router;