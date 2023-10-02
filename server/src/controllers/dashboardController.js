import {conn} from '../db.js';

export const editProfileEmployee = async (req, res) => {
    try {
      const imagen = req.file;
      const id = req.params.id;
      // console.log(imagen)
    
      const { nombre, telefono, direccion } = req.body;
      const ifNull = imagen == undefined ? null : imagen;

      //agrego la condicional en la consulta por que al poner ifnull.buffer directamente
      //me da error por que si esta en 'null' no tiene nada que ver con .buffer (null.buffer)
      const sql = await conn.query(
        "UPDATE empleados SET nombre = ?, telefono = ?, direccion = ?, imagen = IFNULL(?, imagen) WHERE idEmpleado = ?",
        [nombre, telefono, direccion, ifNull == null ? ifNull : ifNull.buffer, id]
      );
  
      // if(imagen == undefined){
      //   return res.json({msgR: 'porfavor cambie su imagen'});
      // }
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
  try {
    const image = req.file
    const {nameProduct,category,description,price,stocks,id} = req.body;
    const sql = await conn.query("INSERT INTO productos (nombreProducto,imagen,categoria,descripcion,precio,stock,idEmpleado) VALUES (?,?,?,?,?,?,?)",
    [nameProduct,image.buffer,category,description,price,stocks,id]);

    console.log(sql[0].affectedRows);
    if(sql[0].affectedRows > 0){
      res.status(200).json({msgOk: 'Producto registrado'});
    } else{
      res.status(200).json({msgError: 'Error al registrar producto'});
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" }); 
  }
}


export const getAddedProducts = async (req,res) => {
  try {
    const id = req.params.id
    const sql = await conn.query("SELECT * FROM productos WHERE idEmpleado = ?",[id])  

    if(sql[0].length > 0){
      const addedProducts = sql[0].map((el) => ({
        idProducto: el.idProducto,
        nombreProducto: el.nombreProducto,
        imagen: el.imagen.toString("base64"),
        categoria: el.categoria,
        descripcion: el.descripcion,
        precio: el.precio,
        stock: el.stock,
        idEmpleado: el.idEmpleado
      }));
      res.status(200).json({msgData: true,addedProducts})
    } else{
      res.json({msgNoData: 'No agrego ningun producto'})
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" }); 
  }
}

export const deleteProduct = async (req,res) =>{
  try {
      const {idP,idE} = req.params;
      const sql = await conn.query("DELETE FROM productos WHERE idProducto = ?",[idP]);

      if(sql[0].affectedRows > 0){
        const sql = await conn.query("SELECT * FROM productos WHERE idEmpleado = ?",[idE])

        const newData = sql[0]
        res.status(200).json({msgDelete: true, newData});

      } else{
        res.status(200).json({msgDeleteError: "No se logro eliminar el registro"});
      }

  } catch (err) {
      return res.status(500).json({ msg: "Error en el servidor" }); 
  }
}

export const getAllProducts = async (req,res) =>{
  try {
    const sql = await conn.query(`
    SELECT
      p.idProducto,
      p.nombreProducto,
      p.imagen,
      p.categoria,
      p.descripcion,
      p.precio,
      p.stock,
      e.nombre AS nombreEmpleado,
      p.fecha
    FROM productos AS p
    INNER JOIN empleados AS e ON p.idEmpleado = e.idEmpleado
  `);

  if (sql[0].length > 0) {
    const getAllProducts = sql[0].map((el) => ({
      idProducto: el.idProducto,
      nombreProducto: el.nombreProducto,
      imagen: el.imagen.toString("base64"),
      categoria: el.categoria,
      descripcion: el.descripcion,
      precio: el.precio,
      stock: el.stock,
      idEmpleado: el.nombreEmpleado,
      fecha: el.fecha
    }));
    res.status(200).json({getAllProductData: true,getAllProducts})
  } else{
    res.json({msgNoData: "No se encontraron los productos"})
  }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" }); 
  }
}