import mongoose from "mongoose";
import productsModel from "../db/models/productsModel.js";

const loansSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
    quantity: {
        type: Number,
        required: true,}
        date: {
        type: Date,
        default: Date.now
    }
}
)

const Loans = mongoose.model("Loan", loanSchema);
export default Loans;