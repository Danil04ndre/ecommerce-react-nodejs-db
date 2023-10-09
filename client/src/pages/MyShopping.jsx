import { useContext } from "react";
import UserContext from "../context/UserContext";
import '../css/MyShopping.css'

const MyShopping = () => {
  const { myShoppin } = useContext(UserContext);

  return (
    <div className="my-shoppin">
      {myShoppin.length > 0 && 
        <table>
          <thead>
            <tr>
              <th>Nombre de Producto</th>
              <th>Fecha de Compra</th>
              <th>Precio Unidad</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Estado de Compra</th>
            </tr>
          </thead>
          <tbody>
            {myShoppin.map((item, index) => (
              <tr key={index}>
                <td>{item.nombreProducto}</td>
                <td>{(new Date(item.fecha)).toLocaleString()}</td>
                <td>{item.precio}</td>
                <td>{item.cantidad}</td>
                <td>S/.{item.total}</td>
                <td><i className="fa-solid fa-check"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      {myShoppin.length == 0 && <p>No has realizado ninguna compra</p>}
    </div>
  );
};

export default MyShopping;