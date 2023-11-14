const express = require("express")

const prisma = require('../database/db');
const isAuthenticated = require("../middleware/isAuthenticated")

const router=express.Router();

router.get("/profile",isAuthenticated,async(req,res)=>{
  try {
        const userId = req.user.id;
    
        // Fetch merchant details from the database
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
    
        if (!user) {
          return res.status(404).json({ message: 'Merchant not found' });
        }
        res.status(200).json({ user });
      } catch (error) {
        next(error);
      }
})

router.put("/profile",isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email, username, profilePhoto } = req.body; // You can include other fields as needed

    // Update the user's profile in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        username,
        profilePhoto,
        // Add other fields here if needed
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
});

router.delete("/profile",isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Delete the user account from the database
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, you can perform any necessary cleanup or additional actions here.

    res.status(200).json({ message: 'User account deleted'})
  } catch (error) {
    next(error);
  }
});
module.exports = router ;