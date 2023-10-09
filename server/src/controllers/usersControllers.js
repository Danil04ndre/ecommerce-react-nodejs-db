import { conn } from "../db.js";

export const getThreeLatestProducts = async (req, res) => {
  try {
    const sql = await conn.query(`
        WITH RankedProducts AS (
          SELECT
            idProducto,
            nombreProducto,
            imagen,
            categoria,
            descripcion,
            precio,
            stock,
            fecha,
            ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY fecha DESC) AS rn
          FROM
            productos
        )
        SELECT
          idProducto,
          nombreProducto,
          imagen,
          categoria,
          descripcion,
          precio,
          stock,
          fecha
        FROM
          RankedProducts
        WHERE
          rn <= 3;
      `);

    if (sql[0].length > 0) {
      const data = sql[0].map((el) => ({
        idProducto: el.idProducto,
        nombreProducto: el.nombreProducto,
        imagen: el.imagen.toString("base64"),
        categoria: el.categoria,
        descripcion: el.descripcion,
        precio: el.precio,
        stock: el.stock,
      }));

      res.status(200).json({ latestProducts: true, data });
    } else {
      res.json({ msgNoLatestProducts: "No se encontraron los productos" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const sql = await conn.query(
      "SELECT * FROM productos WHERE categoria = ?",
      [category]
    );

    if (sql[0].length > 0) {
      const data = sql[0].map((el) => ({
        idProducto: el.idProducto,
        nombreProducto: el.nombreProducto,
        imagen: el.imagen.toString("base64"),
        categoria: el.categoria,
        descripcion: el.descripcion,
        precio: el.precio,
        stock: el.stock,
      }));
      res.status(200).json({ msgDataCategory: true, data });
    } else {
      res.json({ msgNoCategory: "No se encontro la categoria" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const getProductDetails = async (req, res) => {
  const { category, id } = req.params;
  try {
    const sql = await conn.query(
      "SELECT * FROM productos WHERE categoria = ? AND idProducto = ?",
      [category, id]
    );

    if (sql[0].length > 0) {
      const data = sql[0].map((el) => ({
        idProducto: el.idProducto,
        nombreProducto: el.nombreProducto,
        imagen: el.imagen.toString("base64"),
        categoria: el.categoria,
        descripcion: el.descripcion,
        precio: el.precio,
        stock: el.stock,
      }));
      res.status(200).json({ mdgDetailProdcuto: true, data });
    } else {
      res.json({ msgNoProduct: "No se encontro el producto" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const postBuyProduct = async (req, res) => {
  const data = req.body;
  const verify = [];

  try {
    for (const item of data) {
      const { idProducto, idUsuario, cantidad, total } = item;
      const result = await conn.query(
        "INSERT INTO compras (idProducto, idUsuario, cantidad, total) VALUES (?, ?, ?, ?)",
        [idProducto, idUsuario, cantidad, total]
      );
      //enviar el result a la variable, para verificar si se guardo el sql,
      //si no se guardo esta vacio [], y con la condicional mandamos respuesta al front,
      //ya que no se puede acceder fuera del for la variable result (por el for que encapsula (scoop))
      verify.push(result);
    }

    if (verify.length > 0) {
      res.status(200).json({ msgBuy: true });
    } else {
      res.json({ msgBuy: false });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const getMyShopping = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = await conn.query(
      `SELECT productos.nombreProducto,productos.precio,compras.cantidad, compras.total, compras.fecha
      FROM compras
      JOIN productos ON compras.idProducto = productos.idProducto
      JOIN usuarios ON compras.idUsuario = usuarios.idUsuario
      WHERE usuarios.idUsuario = ?`,
      [id]
    );
    if (sql[0].length > 0) {
      res.status(200).json({ msgMyShopping: true, data: sql[0] });
    } else {
      res.status(200).json({ msgMyShopping: false });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
