import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import CartSchema from '../../Schemas/CartSchema.js';

const router = express.Router();
router.use(bodyParser.json());

// Get User Cart (by UserID)
router.get("/:userId", async (req, res) => {
    const data = await CartSchema.find({ UserID: req.params.userId });
    res.send(data);
});

// Empty Cart (by UserID)
router.delete("/:userId", async (req, res) => {
    await CartSchema.deleteMany({ UserID: req.params.userId });
    res.send("Cart emptied successfully");
});

// Add Item to Cart
router.post("/", async (req, res) => {
    const { ProductID, ProductQuantity, UserID } = req.body;

    const newCartItem = new CartSchema({
        ProductID,
        ProductQuantity,
        UserID
    });

    await newCartItem.save();
    res.send("Product added to cart");
});

// Update Cart (by CartID)
router.put("/item/:_id", async (req, res) => {
    const { _id } = req.params;
    const { ProductQuantity } = req.body;
    const cartItem = await CartSchema.findById(_id);

    if (!cartItem) {
        return res.send("Cart item not found");
    }

    cartItem.ProductQuantity = ProductQuantity;
    
    await cartItem.save();
    res.send("Product quantity updated");
});

// Remove Item from Cart (by CartID)
router.delete("/item/:cartId", async (req, res) => {
    const deletedItem = await CartSchema.findByIdAndDelete(req.params.cartId);

    if (!deletedItem) {
        return res.send("Cart item not found");
    }
    res.send("Cart item removed");
});

export {router};