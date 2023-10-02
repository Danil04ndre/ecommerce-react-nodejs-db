import { conn } from "../db.js";
import bcrypt from "bcrypt";
import fs from 'fs'



export const register = async (req, res) => {
  try {
   
    const { nombre, email, contrasena, option } = req.body;
    const tablaDb = option == "usuario" ? "usuarios" : "empleados";

    const emailExiste = await conn.query(
      `SELECT * FROM ${tablaDb} WHERE email = ?`,
      [email]
    );

    if (emailExiste[0].length > 0) {
      res.json({ msgEmail: "Existente, utilice otro email." });
      return;
    }

    //podria tambien usar la varible tablaDb para solo tener un 'INSERT INTO ${tablaDb} ya que son mismos campos'
    //pero digamos que tengo distintos campos de esas 2 tablas, una condicional para evalular la opcion,
    if (option == "usuario") {
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const sql = await conn.query(
        "INSERT INTO usuarios (nombre,email,contrasena) VALUES (?,?,?)",
        [nombre, email, hashedPassword]
      );

      if (sql[0].affectedRows > 0) {
        res.status(200).json({ msg: "ok" });
      } else {
        res.status(404).json({ msg: "Error al registrar." });
      }
    } else {
      const imageDefault = fs.readFileSync("../imageDefault/profile.jpg");
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const sql = await conn.query(
        "INSERT INTO empleados (nombre,email,contrasena,imagen) VALUES (?,?,?,?)",
        [nombre, email, hashedPassword,imageDefault]
      );

      if (sql[0].affectedRows > 0) {
        res.status(200).json({ msg: "ok" });
      } else {
        res.status(404).json({ msg: "Error al registrar." });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, contrasena } = req.body;
    const sqlUsuarios = await conn.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    const sqlEmpleados = await conn.query(
      "SELECT * FROM empleados WHERE email = ?",
      [email]
    );

    if (sqlUsuarios[0].length > 0) {
      console.log("bienvenido usuario");
      const contrasenaDb = sqlUsuarios[0][0].contrasena;
      const contrasenaCorrecta = await bcrypt.compare(contrasena, contrasenaDb);

      if (contrasenaCorrecta) {
        const idUsuario = (req.session.idUsuario = sqlUsuarios[0][0].idUsuario);
        const name = (req.session.name = sqlUsuarios[0][0].nombre);
        const email = (req.session.email = sqlUsuarios[0][0].email);

        res.json({ accountUser: true, name, email, idUsuario });
        console.log(req.session);
      } else {
        res.json({ msgFalsePass: "Contraseña incorrecta." });
      }
    } else if (sqlEmpleados[0].length > 0) {

      const contrasenaDb = sqlEmpleados[0][0].contrasena;
      const contrasenaCorrecta = await bcrypt.compare(contrasena, contrasenaDb);

      if (contrasenaCorrecta) {

        const idEmpleado = (req.session.idEmpleado = sqlEmpleados[0][0].idEmpleado);
        const name = (req.session.name = sqlEmpleados[0][0].nombre);
        const email = (req.session.email = sqlEmpleados[0][0].email);
        const telefone = (req.session.telefone = sqlEmpleados[0][0].telefono);
        const direction = (req.session.direction = sqlEmpleados[0][0].direccion);
        const image = (req.session.image = sqlEmpleados[0][0].imagen.toString("base64"));
    
        res.json({ accountEmployee: true, name, email, idEmpleado, telefone,direction,image });
      } else {
        res.json({ msgFalsePass: "Contraseña incorrecta." });
      }
    } else {
      res.json({ msgEmail: "Email no existente." });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};