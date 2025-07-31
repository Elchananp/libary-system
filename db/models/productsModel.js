import mongoose from "mongoose";
import User from "../db/models/userModel.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isLoan: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["regular", "digital"],
    default: "regular",
  },
  // for digital books
  userLoan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
