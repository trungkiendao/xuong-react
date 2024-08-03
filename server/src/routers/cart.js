import express from "express";


import { list ,addCart, getCartByUserId, updateItem} from "../controllers/Cart.js"


var router = express.Router();

router.get('/', list)

router.get('/user/:id',getCartByUserId )

router.post('/', addCart)

router.put('/user/:id', updateItem)


export default router


