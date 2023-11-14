const express = require("express")
const passport = require('../config/passport-config');
const bcrypt = require('bcrypt');

const prisma = require('../database/db');

const router=express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.redirect('/register'); // Redirect back to registration if the user already exists
    }
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  
    // Log in the new user
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard'); // Redirect to the user's dashboard after registration
    });
  });


router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/', // Redirect on successful login
      failureRedirect: '/login', // Redirect on login failure
    })
);




module.exports = router ;