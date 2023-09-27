import { Router} from 'express';
import {register,login, editProfileEmployee} from '../controllers/employeesControllers.js';

import multer from 'multer'

const routerEmployees = Router();

const disStorage = multer.memoryStorage();

const fileUpload = multer({
  storage: disStorage,
});


routerEmployees.post("/api/register",register);
routerEmployees.post("/api/login",login)
routerEmployees.put("/api/updateProfile/:id",fileUpload.single('file'),editProfileEmployee);

export default routerEmployees;
