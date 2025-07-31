import express from "express"
import { createUser, getAllUsers, getUserById, deleteUser} from "../controllers/userController.js";

const userRouter = express.Router()

// userRouter.get("/", (req, res) => {
//     console.log("from all users")
//     res.send("from all users")
// })

userRouter.post("/register", createUser);


export default userRouter;