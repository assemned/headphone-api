import express from "express";
import { Payment } from "../models/paymentModel.js";

const router = express.Router();

// GET all the payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ payments });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET one payments
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const onePayment = await Payment.findById(id);
    res.status(200).json(onePayment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// ADD one payments
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.cardNumber ||
      !req.body.expirationDate ||
      !req.body.cvc ||
      !req.body.billingAddress ||
      !req.body.country ||
      !req.body.city ||
      !req.body.shippingAddress ||
      !req.body.postalCode
    ) {
      return res.status(400).send("Send valid data");
    }
    const newPayment = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cardNumber: req.body.cardNumber,
      expirationDate: req.body.expirationDate,
      cvc: req.body.cvc,
      billingAddress: req.body.billingAddress,
      country: req.body.country,
      city: req.body.city,
      shippingAddress: req.body.shippingAddress,
      postalCode: req.body.postalCode,
    };
    const createPayment = await Payment.create(newPayment);
    res.status(200).send(createPayment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// DELETE one payments
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Payment.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Payment not found" });
    }
    return res.status(200).send({ message: "Payment Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// UPDATE one payments
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.cardNumber ||
      !req.body.expirationDate ||
      !req.body.cvc ||
      !req.body.billingAddress ||
      !req.body.country ||
      !req.body.city ||
      !req.body.shippingAddress ||
      !req.body.postalCode
    ) {
      return res.status(400).send("Send valid data");
    }
    const { id } = req.params;
    const result = await Payment.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment upadated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
