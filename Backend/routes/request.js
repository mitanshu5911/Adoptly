const express = require('express');
const router = express.Router();

const Request = require('../models/Request');

router.post('/postRequest', async (req, res) => {
    try {
        const { petId, ownerId, requesterId, petName, RequesterName } = req.body;

        if (!petId || !ownerId || !requesterId || !petName || !RequesterName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields.',
            });
        }

        const existingRequest = await Request.findOne({ petId, requesterId });
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'You have already requested for this pet.',
            });
        }

        const newRequest = new Request({
            petId,
            ownerId,
            requesterId,
            petName,
            RequesterName,
        });

        await newRequest.save();

        res.status(201).json({
            success: true,
            message: 'Request sent successfully!',
            data: newRequest,
        });



    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating request.',
            error: error.message,
        });
    }
})


router.get("/getRequest", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const data = await Request.find({
      $or: [{ ownerId: userId }, { requesterId: userId }],
    })
      .populate("ownerId", "name email") // ✅ Add this line
      .populate("requesterId", "name email")
      .populate("petId", "petname species age")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




router.delete("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Request ID is required" });
    }
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, message: "Request cancelled successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ success: false, message: "Server error while deleting request" });
  }
});


router.patch("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("requesterId", "name email")
      .populate("petId", "petname species");

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true, message: `Request ${status}`, data: updatedRequest });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;