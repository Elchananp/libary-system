import mongoose from "mongoose";
import Loans from "../db/models/loanModel.js";
import Product from "../db/models/productsModel.js";
import User from "../db/models/userModel.js";


// only admin can do it
const createOrder = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    console.log("body: ", req.body);

    if (!productId || !userId) {
      return res.status(400).json({ error: "Product ID and User ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {    
      return res.status(404).json({ error: "User not found" });
    }
    if (user.isLoan) {
      return res.status(400).json({ error: "User already has a loan please enter the book before" });
    }
    
    
    const product = await Product.findById(productId);
    if (product.isLoan && product.type === "regular") {
        return res.status(400).json({ error: "This product is not available for loan" });
    }


    const newLoan = new Loans({
      product: productId,
      user: userId,
    });

    await newLoan.save();
    user.isLoan = true; 
    await user.save();
    product.userLoan.push(userId);
    Product.isLoan = true;
    await product.save();

  } catch (error) {}
};


const returnBook = async (req, res) => {
    try {
        const { loanId } = req.body;
        if (!loanId) {
        return res.status(400).json({ error: "Loan ID is required" });
        }
    
        const loan = await Loans.findById(loanId);
        if (!loan)  return res.status(404).json({ error: "Loan not found" });
        const product = await Product.findById(loan.product);
        if (!product) return res.status(404).json({ error: "Product not found" });
        const user = await User.findById(loan.user);
        if (!user) return res.status(404).json({ error: "User not found" });
        user.isLoan = false;
        await user.save();  
        product.userLoan.pull(user._id);
        if (product.type === "regular" || (product.type === "digital" && product.userLoan.length === 0)) {
            product.isLoan = false;
        }else if (   ) {
            product.isLoan = false;
        }

        // product.type === "regular" ? product.isLoan = false : 
        await product.save();
        await Loans.findByIdAndDelete(loanId);
        res.status(200).json({ message: "Book returned successfully" });
}
}


export { createOrder, returnBook };