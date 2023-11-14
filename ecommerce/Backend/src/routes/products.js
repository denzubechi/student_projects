const express = require("express")

const prisma = require('../database/db');
const isAuthenticated = require("../middleware/isAuthenticated")
const isAdmin = require("../middleware/isAdmin")

const router=express.Router();

router.get("/products", isAuthenticated, async (req, res, next) => {
    try {
      // Fetch all products from the database
      const products = await prisma.product.findMany();
  
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  });

  router.get("/products/:productId", isAuthenticated, async (req, res, next) => {
    try {
      const productId = parseInt(req.params.productId);
  
      // Fetch the product from the database by its ID
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  });
  
  router.post("/products", isAuthenticated,isAdmin, async (req, res, next) => {
    try {
      const {
        name,
        description,
        tax,
        price,
        originalPrice,
        discountedPrice,
        costPerItem,
        continueSellingWhenOutOfStock,
        requiresShipping,
        weight,
        countryOfShipment,
        hsCode,
        sku,
        barcode,
        status,
        productType,
        vendor,
        collections,
        tags,
        productImages,
      } = req.body;
  
      // Create a new product in the database
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          tax,
          price,
          originalPrice,
          discountedPrice,
          costPerItem,
          continueSellingWhenOutOfStock,
          requiresShipping,
          weight,
          countryOfShipment,
          hsCode,
          sku,
          barcode,
          status,
          productType,
          vendor,
          collections,
          tags,
          productImages,
        },
      });
  
      res.status(201).json({ product: newProduct });
    } catch (error) {
      next(error);
    }
  });
  router.put("/products/:productId", isAuthenticated, isAdmin,async (req, res, next) => {
    try {
      const productId = parseInt(req.params.productId);
      const {
        name,
        description,
        tax,
        price,
        originalPrice,
        discountedPrice,
        costPerItem,
        continueSellingWhenOutOfStock,
        requiresShipping,
        weight,
        countryOfShipment,
        hsCode,
        sku,
        barcode,
        status,
        productType,
        vendor,
        collections,
        tags,
        productImages,
      } = req.body;
  
      // Update the product in the database
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          tax,
          price,
          originalPrice,
          discountedPrice,
          costPerItem,
          continueSellingWhenOutOfStock,
          requiresShipping,
          weight,
          countryOfShipment,
          hsCode,
          sku,
          barcode,
          status,
          productType,
          vendor,
          collections,
          tags,
          productImages,
        },
      });
  
      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/products/:productId", isAuthenticated, isAdmin,async (req, res, next) => {
    try {
      const productId = parseInt(req.params.productId);
  
      // Delete the product from the database
      const deletedProduct = await prisma.product.delete({
        where: { id: productId },
      });
  
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router 