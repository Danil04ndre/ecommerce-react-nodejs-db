import { useContext } from "react";
import UserContext from "../context/UserContext";
import "../css/Cart.css";

const Cart = () => {
  const { cart, setCart, handleBuyProduct } = useContext(UserContext);

  const handleRemoveFromCart = (quantity, all = false) => {
    const itemToDelete = cart.find((item) => item.idProducto == quantity);

    if (itemToDelete.cantidad > 1) {
      if (!all) {
        const updatedCart = cart.map((item) => {
          if (item.idProducto == quantity) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            return item;
          }
        });
        setCart(updatedCart);
      } else {
        const removeProduct = cart.filter(
          (item) => item.idProducto !== quantity
        );
        setCart(removeProduct);
      }
    } else {
      const removeProduct = cart.filter((item) => item.idProducto !== quantity);
      setCart(removeProduct);
    }
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.idProducto == id) {
        return { ...item, cantidad: item.cantidad + 1 };
      } else {
        return item;
      }
    });
    setCart(updatedCart);
  };
  return (
    <>
      <div className="content-page-cart">
        <div className="products-cart">
          {cart.length > 0
            ? cart.map((producto, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-info">
                    <img
                      src={`data:image/png;base64,${producto.imagen}`}
                      alt=""
                      className="cart-img"
                    />
                    <span>{producto.nombreProducto}</span>
                  </div>
                  <div>
                    <small>Precio</small> <br />
                    <span>S/.{producto.precio}</span>
                  </div>

                  <div className="cart-options">
                    <button
                      onClick={() => handleRemoveFromCart(producto.idProducto)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span>{producto.cantidad}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(producto.idProducto)
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className="cart-price">
                    <small>Total</small> <br />
                    <span>S/.{producto.precio * producto.cantidad}</span>
                    <button
                      onClick={() =>
                        handleRemoveFromCart(producto.idProducto, true)
                      }
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
        {cart.length > 0 ? (
          <div className="info-total">
            <h3>TOTAL DEL CARRITO</h3>
            <div className="total">
              <span>Subtotal:</span>
              <span className="span">
                S/.
                {cart.reduce(
                  (total, producto) =>
                    total + producto.precio * producto.cantidad,
                  0
                )}
              </span>
              <span>Descuento:</span>
              <span className="span"><small>Sin descuento</small></span>
              <span>Total:</span>
              <span className="span f">
                S/.
                {cart
                  .reduce(
                    (total, producto) =>
                      total + producto.precio * producto.cantidad,
                    0
                  )
                  .toFixed(2)}
              </span>
              <button onClick={() => handleBuyProduct(cart)}>Comprar</button>
            </div>
          </div>
        ) : null}
      </div>
      {cart.length == 0 && <p className="empty-cart">Tu carrito esta vacio</p>}
    </>
  );
};

export default Cart;
