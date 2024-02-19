const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")


const authRouter = require("./auth");
const itemRouter = require("./item");
const orderRouter = require("./order");


router.use("/auth", authRouter);

/*The routes above will not pass through the middleware*/

router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET")
        req.user = user;
        next()
    } catch (error) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
    }
})

/*The routes below will pass through the middleware*/

router.use("/item", itemRouter);
router.use("/order", orderRouter);

module.exports = router;