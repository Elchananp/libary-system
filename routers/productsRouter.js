import express from "express"

const productRouter = express.Router()

productRouter.get("/", (req, res) => {
    console.log("from all users")
    res.send("from all users")
})


export default productRouter;