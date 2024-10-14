// backend/routes/user.js
const express = require('express');
const authMiddleware = require('../middleware');
const router = express.Router();
const zod = require("zod");
const { User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET  = require("../config");

const signupBody = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }


    const existingUser = await User.findOne({
        username : req.body.username
    })


    if(existingUser){
        return  res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

        const userId = user._id;


    // Create a new Account
    await Account.create({
    userId,
        balance : 1 + Math.random() * 10000
    })
        const token = jwt.sign({
            userId
        },"sid-paytm");


        res.status(200).json({
            message: "User Created sucessfully",
            token:token
        })

})



const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post("/signin" , async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(!existingUser){
        return res.status(411).json({
            message: "Invalid username / password"
        })
    }



    const token = jwt.sign({
        userId: existingUser._id
    },"sid-paytm");

    res.status(200).json({
        message: "User logged in sucessfully",
        token

    })





})


router.get("/auth",authMiddleware,async (req,res)=>{
    try {
        const user = await User.findById(req.body.userId)
        //instaram password isn't needed everytime u get in '-' minus
        res.send({
            success: true,
            message: "You're Authorised",
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Not Authorised"
        })
    }

})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk" , async (req,res) =>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [
            {
                firstName : {
                    "$regex":filter,
                    "$options": "i"
                }
            },
            {
                lastName:{
                    "$regex":filter,
                    "$options": "i"
                }
            }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})



module.exports = router;