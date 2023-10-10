import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [lastestProducts, setLastestProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [detail, setDetail] = useState(null);
  const [dataCategory, setDataCategory] = useState([]);
  const [detailProduct, setDetailProduct] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [cart, setCart] = useState([]);
  const [myShoppin, setMyShoppin] = useState([]);

  const goTo = useNavigate();
  useEffect(() => {
    const getThreeLatestProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:7000/api/getThreeLatestProducts"
        );
        const json = await res.json();
        if (json.latestProducts) {
          // mezclar arreglo
          const shuffledProducts = json.data.sort(() => Math.random() - 0.5);
          setLastestProducts(shuffledProducts);
        } else {
          setLastestProducts([]);
        }
        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Error: ${err.status} ${err.statusText}`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            icon: "swal-icon-err",
            title: "swal-title",
          },
        });
      }
    };

    getThreeLatestProducts();

    if(localStorage.getItem("sessionUser")){
      handleMyShopping();
    }

  }, []);

  useEffect(() => {
    if (category !== null) {
      const getDataCategory = async () => {
        try {
          const res = await fetch(
            `http://localhost:7000/api/getProductsByCategory/${category}`
          );
          const json = await res.json();
          if (json.msgDataCategory) {
            setDataCategory(json.data);
            setNotFound(null);
          } else {
            setDataCategory([]);
            setNotFound(`No se encontro el recurso solicitado`);
          }
          if (!res.ok) {
            throw { status: res.status, statusText: res.statusText };
          }
        } catch (err) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Error: ${err.status} ${err.statusText}`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              icon: "swal-icon-err",
              title: "swal-title",
            },
          });
        }
      };

      getDataCategory();
    }
  }, [category]);

  useEffect(() => {
    if (detail !== null) {
      const getProductDetails = async () => {
        try {
          const res = await fetch(
            `http://localhost:7000/api/getProductDetails/${detail.category}/${detail.id}`
          );
          const json = await res.json();
          if (json.mdgDetailProdcuto) {
            setDetailProduct(json.data);
            setNotFound(null);
          } else {
            setDetailProduct([]);
            setNotFound(`No se encontro el recurso solicitado`);
          }
          if (!res.ok) {
            throw { status: res.status, statusText: res.statusText };
          }
        } catch (err) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Error: ${err.status} ${err.statusText}`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              icon: "swal-icon-err",
              title: "swal-title",
            },
          });
        }
      };
      getProductDetails();
    }
  }, [detail]);

  const handleBuyProduct = async (cart) => {
    if (localStorage.sessionUser == undefined) {
      await Swal.fire({
        icon: "warning",
        text: `Es necesario iniciar sesion primero`,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          icon: "swal-icon-war",
          title: "swal-title",
        },
      });
      goTo("/login");
      return;
    }

    const dataBuyProduct = cart.map((item) => ({
      idProducto: item.idProducto,
      idUsuario: parseInt(localStorage.id),
      cantidad: item.cantidad,
      total: item.precio * item.cantidad,
    }));
    try {
      const res = await fetch("http://localhost:7000/api/postBuyProduct", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataBuyProduct),
      });
      const json = await res.json();

      if (json.msgBuy) {
        await Swal.fire({
          icon: "success",
          text: `Se realizo su compra con exito`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            icon: "swal-icon-succ",
            title: "swal-title",
          },
        });
        handleMyShopping();
        setCart([]);
      }
      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Error: ${err.status} ${err.statusText}`,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          icon: "swal-icon-err",
          title: "swal-title",
        },
      });
    }
  };

  const handleMyShopping = async () => {
    try {
      const res = await fetch(
        `http://localhost:7000/api/getMyShopping/${localStorage.id}`
      );
      const json = await res.json();
      
      if (json.msgMyShopping) {
        setMyShoppin(json.data);
      } else {
        setMyShoppin([]);
      }
      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Error: ${err.status} ${err.statusText}`,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          icon: "swal-icon-err",
          title: "swal-title",
        },
      });
    }
  };
  const data = {
    lastestProducts,
    setCategory,
    setDetail,
    notFound,
    dataCategory,
    detailProduct,
    setCart,
    cart,
    handleBuyProduct,
    myShoppin,
  };
  return <UserContext.Provider value={data}> {children} </UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { UserProvider };
export default UserContext;
