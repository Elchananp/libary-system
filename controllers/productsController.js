import mongoose from "mongoose";
import Product from "../db/models/productsModel";


const createProduct = async (req, res) => {
    try {
        const { name, category, isLoan, type } = req.body;
        console.log("Creating product with data:", req.body);

        const newProduct = new Product({
            name,
            category,
            isLoan,
            type,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getProductByName = async (req, res) => {
    const productName = req.params.name;
    try {
        if (!productName) {
            return res.status(400).json({ error: "Product name is required" });
        }
        const product = await Product.find({ name: productName });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);

    }catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// const getProductByCategory = async (req, res) => {}

    
  
export { createProduct, getAllProducts, getProductByName, deleteProduct };