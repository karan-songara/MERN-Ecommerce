import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import RemarkSchema from '../../Schemas/RemarkSchema.js';

const router = express.Router();
router.use(bodyParser.json());

// 1. Get All Remarks
router.get("/remarks", async (req, res) => {
    const remarks = await RemarkSchema.find();
    res.send(remarks);
});

// 2. Get Remark by ID
router.get("/remarks/:id", async (req, res) => {
    const { id } = req.params;
    const remark = await RemarkSchema.findById(id);

    if (!remark) {
        return res.send("Remark not found");
    }
    res.send(remark);
});

// 3. Insert a New Remark
router.post("/remarks", async (req, res) => {
    const { RemarkDescription, Rating, UpdatedAt, UserId, ProductID } = req.body;

    const newRemark = new RemarkSchema({
        RemarkDescription,
        Rating,
        UpdatedAt,
        UserId,
        ProductID
    });

    await newRemark.save();
    res.send({ message: "Remark created successfully", remark: newRemark });
});

// 4. Update Remark by ID
router.put("/remarks/:id", async (req, res) => {
    const { id } = req.params;
    const { RemarkDescription, Rating, UpdatedAt, UserId, ProductID } = req.body;
    const remark = await RemarkSchema.findById(id);

    if (!remark) {
        return res.send("Remark not found");
    }

    remark.RemarkDescription = RemarkDescription;
    remark.Rating = Rating;
    remark.UpdatedAt = UpdatedAt;
    remark.UserId = UserId;
    remark.ProductID = ProductID;
    
    await remark.save();
    res.send({ message: "Remark updated successfully", remark });
});

// 5. Delete Remark by ID
router.delete("/remarks/:id", async (req, res) => {
    const { id } = req.params;
    const remark = await RemarkSchema.findByIdAndDelete(id);

    if (!remark) {
        return res.send("Remark not found");
    }
    res.send("Remark deleted successfully");
});

export default router;