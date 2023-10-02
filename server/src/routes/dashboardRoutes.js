import { Router} from 'express';

import multer from 'multer';
import {addProduct, editProfileEmployee,getAddedProducts,deleteProduct,getAllProducts} from '../controllers/dashboardController.js'


const disStorage = multer.memoryStorage();
const fileUpload = multer({
  storage: disStorage,
});

const routerDashboard = Router();

routerDashboard.put("/api/updateProfile/:id",fileUpload.single('file'),editProfileEmployee);
routerDashboard.post("/api/addProduct",fileUpload.single('file'),addProduct);
routerDashboard.get("/api/getAddedProducts/:id",getAddedProducts);
routerDashboard.delete("/api/deleteProduct/:idP/:idE",deleteProduct);
routerDashboard.get("/api/getAllProducts",getAllProducts)


export default routerDashboard;
