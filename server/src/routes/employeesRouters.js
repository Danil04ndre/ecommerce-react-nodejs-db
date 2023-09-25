import { Router} from 'express';
import {register,login, editProfileEmployee} from '../controllers/employeesControllers.js';


const routerEmployees = Router();



routerEmployees.post("/api/register",register);
routerEmployees.post("/api/login",login)
routerEmployees.put("/api/updateProfile/:id" ,editProfileEmployee);

export default routerEmployees;
