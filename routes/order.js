const Users = require('../models/User');
const Order = require("../models/Order");
const Item = require("../models/Item");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/createOrder", async (req, res) => {
    try {


        const userEmail = req.user.email;
        const { itemNames } = req.body;

        const currentUser = await Users.findOne({ email: userEmail });

        console.log(currentUser._id);

        const items = await Item.find({ name: { $in: itemNames } });

        console.log(items);


         const totalPrice = items.reduce((total, item) => total + item.price, 0);


         const order = new Order({
            user: currentUser._id,
            items: items.map(item => item._id),
            total: totalPrice
        });

        const savedOrder = await order.save();
        
        res.json({ msg: "Order created successfully", data: savedOrder });
    } catch (error) {
        console.error(error);
    }
});


router.get('/viewOrder', async(req, res) => {
    try{
        const { orderId } = req.body;

        if(!orderId) {
            return res.json({msg: "Order ID missing"});
        }

        const order = await Order.findById(orderId).populate('user').populate('items');
        if (!order) {
            res.json({msg: "Order not found!"});
        }
        res.json({msg: "Order Found", data: order});
    }
    catch(error) {
        console.error(error);
    }
});




module.exports = router
