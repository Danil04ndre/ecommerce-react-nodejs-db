import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import UserContext from "../context/UserContext";

import "../css/Detail.css";
const Detail = () => {
  const { setDetail, notFound, detailProduct, setCart, cart } =
    useContext(UserContext);

  const { category, id } = useParams();

  useEffect(() => {
    setDetail({ category, id });
    window.scrollTo(0, 0);
  }, [category, id, setDetail]);

  const handleBuyCart = (producto) => {
    const productInCart = cart.find(
      (id) => id.idProducto == producto.idProducto
    );

    if (!productInCart) {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    } else {
      const updatedCart = cart.map((item) => {
        if(item.idProducto == producto.idProducto){
          return {...item, cantidad: item.cantidad + 1} 
        } else {
          return item;
        }
      })
      setCart(updatedCart);
    }
  };

  return (
    <>
      <div className="content-detail">
        {detailProduct.map((el, index) => (
          <Card key={index} producto={el}>
            <p className="g">
              8% OFF en 12x 403 soles con 25 céntimos S/ 403 , 25 sin interés
            </p>
            <small>Ver los medios de pago</small>
            <div className="options">
            <Link to="/cart">
              Ir al carrito
            </Link>
            <button onClick={() => handleBuyCart(el)}>
              Agregar al carrito
            </button>
            </div>
          </Card>
        ))}
      </div>

      {notFound ? <p className="not-found">{notFound}</p> : null}
    </>
  );
};

export default Detail;
