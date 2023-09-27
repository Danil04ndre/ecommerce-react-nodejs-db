import { Router} from 'express';

import multer from 'multer';
import {addProduct, editProfileEmployee} from '../controllers/dashboardController.js'


const disStorage = multer.memoryStorage();
const fileUpload = multer({
  storage: disStorage,
});

const routerDashboard = Router();

routerDashboard.put("/api/updateProfile/:id",fileUpload.single('file'),editProfileEmployee);
routerDashboard.post("/api/addProduct",fileUpload.single('file'),addProduct);


export default routerDashboard;
