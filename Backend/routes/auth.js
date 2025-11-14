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
router.post('/login',async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:'Invalid credentials'});

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user._id, userType: user.userType, email: user.email } };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '1min' }, (err, token) => {
        if (err) throw err;
      //=== Return the complete user object with _id, email, and userType
        console.log("login");
        res.json({ token, user: { _id: user._id, email: user.email, name:user.name } });
    });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).send('Server error');
    }
})

router.delete("/deleteacc", async (req,res) =>{
    try{
        
    }catch(error){

    }
})
module.exports = router;