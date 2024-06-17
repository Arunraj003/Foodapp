import express from "express"
import { addTocart, removeFromCart, getCart } from "../controllers/cartControllers.js"
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

// multiple end points
cartRouter.post("/add",authMiddleware,addTocart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)


// export
export default cartRouter;


