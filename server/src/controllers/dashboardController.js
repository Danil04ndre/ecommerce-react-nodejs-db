import {conn} from '../db.js'

export const editProfileEmployee = async (req, res) => {
    try {
      const imagen = req.file;
      const id = req.params.id;
      const { nombre, telefono, direccion } = req.body;
      console.log(req.body);
      console.log(imagen);
  
      if(imagen == undefined){
       return res.json({ msgFile: "Por favor, actualice la imagen o seleccione una nueva imagen." });
  
      }
      const sql = await conn.query(
        "UPDATE empleados SET nombre = ?, telefono = ?, direccion = ?, imagen = ? WHERE idEmpleado = ?",
        [nombre, telefono, direccion, imagen.buffer, id]
      );
  
      if (sql[0].affectedRows > 0) {
        const newData = await conn.query(
          "SELECT * FROM empleados WHERE idEmpleado = ?",
          [id]
        );
  
        const idEmpleado = (req.session.idEmpleado = newData[0][0].idEmpleado);
        const name = (req.session.name = newData[0][0].nombre);
        const telefone = (req.session.telefone = newData[0][0].telefono);
        const direction = (req.session.direction = newData[0][0].direccion);
        const image = (req.session.image =
          newData[0][0].imagen.toString("base64"));
        console.log(newData[0][0]);
      
        res
          .status(200)
          .json({
            msgUpdateOk: true,
            idEmpleado,
            name,
            telefone,
            direction,
            image
          });
      } else {
        res.json({ msgErr: "No se pudo guardar los datos" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Error en el servidor" });
    }
};

export const addProduct = async (req,res) =>{
    console.log(req.file)

    const file = req.file
    const {nameProduct,category,description,price,stocks} = req.body;
    console.log(req.body);
   
    res.send("addp")
}