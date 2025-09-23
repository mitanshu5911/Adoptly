const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const User= require('../models/User');

router.post('/signup',async (req,res) => {
    console.log("Calling SignUp");
    try{
        const {name,email,password}=req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({name,email,password:hashedPassword});
        await user.save();
        res.status(201).json({msg:"User Registered Successfully"});
    }catch(error){
        console.log(error.message);
    }
});

module.exports = router;