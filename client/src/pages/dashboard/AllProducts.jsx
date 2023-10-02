import{ useContext, useState } from "react";
import DashboardContext from "../../context/DashboardContext";

const AllProducts = () => {
  const { allProductsAdded } = useContext(DashboardContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="content-all-products">
      <h3>Todos los productos agregados</h3>
      <div>
        <label>Buscar Empleado (Nombre)</label> <br />
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Categoria</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Agregado por</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {allProductsAdded.map((el, index) => {
            if (!searchTerm || el.idEmpleado.toLowerCase().includes(searchTerm.toLowerCase())) {
              return (
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
                  <td>{el.idEmpleado}</td>
                  <td>{(new Date(el.fecha)).toLocaleString()}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
