import express from "express";
import { PORT, mongodbURL } from "./config/config.js";
import mongoose from "mongoose";
import newsletterRoute from "./routes/newsletterRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

const app = express();

//Midelware for parsing request body
app.use(express.json());

//Midelware for handling CORS policy
app.use(
  cors({
    origin: "https://headphone.onrender.com",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use("/newsletter", newsletterRoute);

app.use("/payment", paymentRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to Data base");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });