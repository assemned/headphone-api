import mongoose from "mongoose";

const payementSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    cvc: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", payementSchema);
