import { useContext } from "react";
import DashboardContext from "../../context/DashboardContext";

const MyProducts = () => {
  const { handleDeleteProduct, addedProductData } =
    useContext(DashboardContext);
  return (
    <div className="added-products">
      <h3>Productos agreados por {localStorage.name}</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Categoria</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {addedProductData.length > 0 ? (
            addedProductData.map((el, index) => (
              <tr key={index}>
                <td>{el.nombreProducto}</td>
                <td>
                  <div className="content-img">
                    <img src={`data:image/png;base64,${el.imagen}`} alt="" />
                  </div>
                </td>
                <td>{el.categoria}</td>
                <td className="hola">{el.descripcion}</td>
                <td>{el.precio}</td>
                <td>{el.stock}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(el.idProducto)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">no añadio ningun producto</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
