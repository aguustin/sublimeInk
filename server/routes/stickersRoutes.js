import { Router } from "express";
import {uploadProductsController,
     getAllProductsController, 
     getProductsByCategoryController, 
     getProductsBySearch, 
     addToCartController,
     getCartProductsIpController, 
     deleteAllProductsController, 
     deleteCartItemController, //ultimo hecho 
     deleteProductController,
     searchController, 
     findUserController } from "../controllers/stickersControllers.js";

const router = Router();

router.post('/uploadProduct', uploadProductsController);

router.get('/allUsers', findUserController);

router.get('/all', getAllProductsController);

router.get('/category/:category', getProductsByCategoryController);

router.post('/', getProductsBySearch);

router.post('/addToCart', addToCartController);

router.get('/getC/:ip', getCartProductsIpController);

router.put('/deleteItem/:ip/:id', deleteCartItemController); //ultimo hecho

router.delete('/deleteAll', deleteAllProductsController);

router.delete('/:id', deleteProductController);

router.post('/search', searchController);


export default router;