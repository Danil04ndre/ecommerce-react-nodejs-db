import express from "express";
import cors from "cors";
import session from "express-session";
import {conn} from './db.js'
import fs from 'fs'
import routerEmployees from "./routes/employeesRoutes.js";
import routerDashboard from "./routes/dashboardRoutes.js"


const app = express();
app.use(cors());
app.use(express.json());


app.use(
  session({
    secret: "asdaskdmaskdm",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(routerEmployees);
app.use(routerDashboard);


app.get("/get", async (req, res) => {
  const sql = await conn.query("SELECT FROM empleados");
  
  res.json(sql[0][0]);
});

app.listen(7000, () => {
  console.log("server listen port 7000");
});
