import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productsRouter.js"
import loansRouter from "./routers/loansRouter.js"
dotenv.config()

const app = express()

app.use(express.json())

app.use("/users", userRouter )
app.use("/products", productRouter )
app.use("/loans", loansRouter )



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });


const PORT = 3000



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})