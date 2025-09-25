const express = require('express');
const router = express.Router();

const PostPet = require('../models/PostPet')
router.post("/post", async (req, res) => {
    try {
        const { userId, petname, ownername, species, age, breed, image, description, contactNumber, colour, medicalIssue, address } = req.body;
        const post = new PostPet({ userId, petname, ownername, species, age, breed, image, description, contactNumber, colour, medicalIssue, address });

        await post.save();
        res.status(201).json(post);
        console.log("done");
    } catch (err) {
        console.error('Error :', err);
        // res.status(500).json({ msg: 'Server error' });
    }
});
router.get("/getpet", async (req, res) => {
  try {
    const pets = await PostPet.find(); // ✅ fetch all pets
    res.status(200).json(pets);
    console.log(pets);
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;