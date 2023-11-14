const express = require("express")

const prisma = require('../database/db');
const isAuthenticated = require("../middleware/isAuthenticated")
const isAdmin = require("../middleware/isAdmin")

const router=express.Router();

router.get('/users', isAuthenticated,isAdmin, async (req, res, next) => {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany();
  
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router ;