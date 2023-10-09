import {Router} from 'express';
import { getMyShopping, getProductDetails, getProductsByCategory, getThreeLatestProducts, postBuyProduct } from '../controllers/usersControllers.js';

const routerUsers = Router();



routerUsers.get("/api/getThreeLatestProducts",getThreeLatestProducts);
routerUsers.get("/api/getProductsByCategory/:category",getProductsByCategory);
routerUsers.get("/api/getProductDetails/:category/:id",getProductDetails);
routerUsers.post("/api/postBuyProduct",postBuyProduct);
routerUsers.get("/api/getMyShopping/:id",getMyShopping)

export default routerUsers;