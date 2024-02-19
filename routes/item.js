const Item = require("../models/Item");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")


router.get("/getItem", async (req, res) => {
    try {
        const item = await Item.findOne({ name: req.body.name })
        if (!item) return res.json({ msg: "ITEM NOT FOUND" })
        res.json({ msg: "ITEM FOUND", data: item })
    } catch (error) {
        console.error(error)
    }
});


router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "Restricted - You are not admin" })
    else next()
})


router.post("/addItem", async (req, res) => {
    try {
        await Item.create(req.body);
        res.json({ msg: "ITEM ADDED" })
    } catch (error) {
        console.error(error)
    }
});



router.post("/deleteItem", async (req, res) => {
    try {
        const itemName = req.body.name;
        const item = await Item.findOne({name: itemName});

        if(!item) return res.json({msg: "ITEM NOT FOUND"});
        await Item.deleteOne({name: itemName});
        res.json({msg: "ITEM DELETED"});
    }
     catch(error) {
        console.error(error);
     }  
    });

module.exports = router

