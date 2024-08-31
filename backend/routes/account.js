const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware');
const {Account} = require("../db");
const mongoose = require("mongoose");



//to get all balances
router.get("/balance" , authMiddleware ,async (req,res)=>{
    const userAccount = await Account.findOne({
        userId : req.userId
    })

    res.json({
        balance : userAccount.balance
    })
})

// //tranfer -> Solution not recommended
// router.post("/transfer",authMiddleware, async (req,res)=>{
//
//     const{amount,to} = req.body;
//
//     const fromuser = await Account.findOne({
//         userId : req.userId
//     })
//
//     const toUser = await Account.findOne({
//         userId : to
//     })
//
//
//     if(fromuser.balance < amount){
//         return res.json({
//             message : "Insufficient balance"
//         })
//     }
//
//     //transaction begins
//     //
//     // Account.findByIdAndUpdate(fromuser,fromuser.balance-req.amount);
//     // Account.findByIdAndUpdate(toUser,toUser.balance+req.body.amount);
//
//     if(!toUser){
//         return res.json({
//             message:"User not found"
//         })
//     }
//
//
//     await Account.updateOne({
//         userId : req.userId
//     },
//         /*Syntax Issue: MongoDB update operations require specific operators like $inc, $set, etc. Directly setting balance: user.req.balance + amount is not a valid MongoDB update operation. It would try to set the balance field to the literal value of user.req.balance + amount, which MongoDB won't understand in that context.*/
//         {
//             $inc :{
//                 balance : -amount
//             }
//         })
//
//     await Account.updateOne({
//         userId : to
//     }
//     ,
//         {
//             $inc : {
//                 balance : amount
//             }
//         })
//
//     res.json({
//         message:"Transaction successful"
//     })
//
// })

// Transfer money
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Fetch sender's account
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Fetch recipient's account
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({ message: "User not found" });
        }

        // Debugging: Log balances before update
        console.log(`Sender Balance Before: ${account.balance}`);
        console.log(`Recipient Balance Before: ${toAccount.balance}`);

        // Perform the transfer
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } },
            { session }
        );

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } },
            { session }
        );

        // Debugging: Log balances after update
        const updatedSender = await Account.findOne({ userId: req.userId }).session(session);
        const updatedRecipient = await Account.findOne({ userId: to }).session(session);

        console.log(`Sender Balance After: ${updatedSender.balance}`);
        console.log(`Recipient Balance After: ${updatedRecipient.balance}`);

        // Commit the transaction
        await session.commitTransaction();
        res.json({ message: "Transaction successful" });

    } catch (error) {
        // Abort the transaction if any error occurs
        await session.abortTransaction();
        console.error("Transaction error:", error);
        res.status(500).json({ message: "Transaction failed" });
    } finally {
        session.endSession();
    }
});
module.exports = router;