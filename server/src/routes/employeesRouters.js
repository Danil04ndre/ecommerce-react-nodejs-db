import { Router} from 'express';
import {register,login} from '../controllers/employeesControllers.js';


const routerEmployees = Router();



routerEmployees.post("/api/register",register);
routerEmployees.post("/api/login",login)


export default routerEmployees;
