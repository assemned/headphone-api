import express from "express";
import { Email } from "../models/newsletterModel.js";

const router = express.Router();

//Route to get All Emails Subscriptions for DataBase
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find({});
    res.status(200).json({ emails });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route to get one Email for DataBase
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneEmail = await Email.findById(id);
    res.status(200).json(oneEmail);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to add an Email to DataBase
router.post("/", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send("Send valid Email");
    }
    const newEmail = { email: req.body.email };
    const createdEmail = await Email.create(newEmail);
    return res.status(200).send(createdEmail);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route to delete an Email from DataBase
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Email.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Email not found" });
    }
    return res.status(200).send({ message: "Email Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to edit an Email from DataBase
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({ message: "Send the new email" });
    }
    const { id } = req.params;
    const result = await Email.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Email not found" });
    }
    return res.status(201).send({ message: "Email upadated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
