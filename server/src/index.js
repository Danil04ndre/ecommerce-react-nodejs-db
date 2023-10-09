import express from "express";
import cors from "cors";
import session from "express-session";
import routerEmployees from "./routes/employeesRoutes.js";
import routerDashboard from "./routes/dashboardRoutes.js"
import routerUsers from "./routes/usersRoutes.js";

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

app.use(routerUsers)
app.use(routerEmployees);
app.use(routerDashboard);

app.listen(7000, () => {
  console.log("server listen port 7000");
});
