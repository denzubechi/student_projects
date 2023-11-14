const express = require("express")

const prisma = require('../database/db');
const isAuthenticated = require("../middleware/isAuthenticated")

const router=express.Router();

// Route to add a product to the user's cart
router.post("/cart/add-product/:productId", isAuthenticated, async (req, res, next) => {
    try {
      const productId = parseInt(req.params.productId);
      const userId = req.user.id; // Assuming you have user information in req.user
      const { quantity } = req.body;
  
      // Check if the product exists
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the product is already in the user's cart
      const existingCartItem = await prisma.cart.findFirst({
        where: {
          userId,
          productId,
        },
      });
  
      if (existingCartItem) {
        // If the product is in the cart, update the quantity
        await prisma.cart.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
      } else {
        // If the product is not in the cart, add it
        await prisma.cart.create({
          data: {
            userId,
            productId,
            quantity,
          },
        });
      }
  
      res.status(201).json({ message: 'Product added to the cart' });
    } catch (error) {
      next(error);
    }
  });
  
  // Route to delete a product from the user's cart
  router.delete("/cart/delete-product/:productId", isAuthenticated, async (req, res, next) => {
    try {
      const productId = parseInt(req.params.productId);
      const userId = req.user.id; // Assuming you have user information in req.user
  
      // Check if the product is in the user's cart
      const cartItem = await prisma.cart.findFirst({
        where: {
          userId,
          productId,
        },
      });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in the cart' });
      }
  
      // Delete the product from the cart
      await prisma.cart.delete({
        where: { id: cartItem.id },
      });
  
      res.status(200).json({ message: 'Product deleted from the cart' });
    } catch (error) {
      next(error);
    }
  });
  module.exports = router ;