const express = require("express")

const prisma = require('../database/db');
const isAuthenticated = require("../middleware/isAuthenticated")
const isAdmin = require("../middleware/isAdmin")

const router=express.Router();

router.get('/reviews', async (req, res, next) => {
    try {
      // Fetch all reviews from the database
      const reviews = await prisma.review.findMany();
  
      res.status(200).json({ reviews });
    } catch (error) {
      next(error);
    }
  });
  
router.post('/products/:productId/reviews', isAuthenticated, async (req, res, next) => {
    try {
      const productId = parseInt(req.params.productId);
      const userId = req.user.id;
      const { stars, comments } = req.body;
  
      // Create a new review in the database
      const newReview = await prisma.review.create({
        data: {
          productId,
          userId,
          stars,
          comments,
        },
      });
  
      res.status(201).json({ review: newReview });
    } catch (error) {
      next(error);
    }
  });
  router.put('/reviews/:reviewId', isAuthenticated, async (req, res, next) => {
    try {
      const reviewId = parseInt(req.params.reviewId);
      const userId = req.user.id;
      const { stars, comments } = req.body;
  
      // Check if the review belongs to the user
      const review = await prisma.review.findUnique({
        where: { id: reviewId },
        select: { userId: true },
      });
  
      if (!review || review.userId !== userId) {
        return res.status(404).json({ message: 'Review not found or unauthorized' });
      }
  
      // Update the review
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: {
          stars,
          comments,
        },
      });
  
      res.status(200).json({ review: updatedReview });
    } catch (error) {
      next(error);
    }
  });
  
  router.delete('/reviews/:reviewId', isAuthenticated, async (req, res, next) => {
    try {
      const reviewId = parseInt(req.params.reviewId);
      const userId = req.user.id;
  
      // Check if the review belongs to the user
      const review = await prisma.review.findUnique({
        where: { id: reviewId },
        select: { userId: true },
      });
  
      if (!review || review.userId !== userId) {
        return res.status(404).json({ message: 'Review not found or unauthorized' });
      }
  
      // Delete the review
      await prisma.review.delete({
        where: { id: reviewId },
      });
  
      res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
      next(error);
    }
  });
    


module.exports = router 