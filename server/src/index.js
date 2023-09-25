import express from "express";
import cors from "cors";
import session from "express-session";

import abc from "./routes/employeesRouters.js";
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

app.use(abc);
app.get("/get", async (req, res) => {
  res.send("get exit");
});

app.listen(7000, () => {
  console.log("server listen port 7000");
});
