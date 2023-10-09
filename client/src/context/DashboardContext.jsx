import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const DashboardContext = createContext();
const initialFormEditProfile = {
  nombre: localStorage.name || "",
  email: localStorage.email || "",
  //operador ternario para: evitar error de bucle infinito en la consola de que el valor
  //del input type number es null y eso causa un bucle infinito,
  telefono: localStorage.telefone || "",
  direccion: localStorage.direction || "",
  file: "",
};

const initialFormAddProduct = {
  producto: "",
  file: "",
  categoria: "",
  descripcion: "",
  precio: "",
  stock: "",
};

const DashboardProvider = ({ children }) => {
  const [formEditProfile, setFormEditProfile] = useState(initialFormEditProfile);
  const [profilePreview, setProfilePreview] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [formAddProduct, setFormAddProduct] = useState(initialFormAddProduct);
  const [addedProductData, setAddedProductData] = useState([]);
  const [allProductsAdded, setAllProductsAdded] = useState([])

  //myaccount

  useEffect(() => {
    if (localStorage.getItem("sessionEmployee")) {
      const getAddedProducts = async () => {
        try {
          const res = await fetch(
              `http://localhost:7000/api/getAddedProducts/${localStorage.id}`
            ),
            json = await res.json();
          if (json.msgData) {
            setAddedProductData(json.addedProducts);
          }
          if (json.msgNoData) {
            setAddedProductData([]);
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
      getAddedProducts();
    }
  }, [addedProductData]);


  useEffect(() => {
    if (localStorage.getItem("sessionEmployee")) {
      getAllProducts()
    }
  }, [])

  const getAllProducts = async () =>{
    try {
      const res = await fetch("http://localhost:7000/api/getAllProducts");
      const json = await res.json();

      if(json.getAllProductData){
        setAllProductsAdded(json.getAllProducts)
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
  }
  const handleEditImageProfile = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtensionPattern = /\.(jpg|jpeg|png)$/i;
    if (!fileExtensionPattern.test(selectedFile.name)) {
      Swal.fire({
        icon: "warning",
        html: "Solo se permiten <strong>archivos de imagen</strong> con las extensiones: <strong>.jpg, .jpeg o .png</strong>",
        customClass: {
          icon: "swal-icon-war",
        },
      });
      return;
    }

    if (selectedFile.size > 500000) {
      Swal.fire({
        icon: "warning",
        html: "El archivo es demasiado grande. El <strong>tamaño maximo</strong> es <strong>500KB.</strong>",
        customClass: {
          icon: "swal-icon-war",
        },
      });
      return;
    }

    setFormEditProfile({
      ...formEditProfile,
      [e.target.name]: selectedFile,
    });

    const imageURL = URL.createObjectURL(selectedFile);
    setProfilePreview(imageURL);
  };

  const handleFormEditProfile = (e) => {
    setFormEditProfile({
      ...formEditProfile,
      [e.target.name]: e.target.value,
    });
  };

  //Dato raro, he intentado muchas veces mandar los datos, sin el file (imagen)
  //y no lo puedo ver los datos enviados por la consola del node, pero si agrego la imagen
  // ahi recien se puede, en conlucion: si quiero mandar datos con imagen utilizo formData
  //si quiero mandar datos de solo texto utilizo JSON
  const handleSubmitEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", formEditProfile.nombre);
    formData.append("email", formEditProfile.email);
    formData.append("telefono", formEditProfile.telefono);
    formData.append("direccion", formEditProfile.direccion);
    formData.append("file", formEditProfile.file);
    try {
      const res = await fetch(
        `http://localhost:7000/api/updateProfile/${localStorage.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const json = await res.json();
      if (json.msgUpdateOk) {
        localStorage.setItem("id", json.idEmpleado);
        localStorage.setItem("name", json.name);
        localStorage.setItem("image", json.image);
        localStorage.setItem("telefone", json.telefone);
        localStorage.setItem("direction", json.direction);
        await Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: "Datos Guardados",
          timer: 1000,
          customClass: {
            icon: "swal-icon-succ",
            title: "swal-title",
          },
        });
        window.location.reload();
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

  //addproduct

  const handleFormAddProductFile = (e) => {
    
    const selectedFile = e.target.files[0];
    const fileExtensionPattern = /\.(jpg|jpeg|png)$/i;
    if (!fileExtensionPattern.test(selectedFile.name)) {
      Swal.fire({
        icon: "warning",
        html: "Solo se permiten <strong>archivos de imagen</strong> con las extensiones: <strong>.jpg, .jpeg o .png</strong>",
        customClass: {
          icon: "swal-icon-war",
        },
      });
      return;
    }

    if (selectedFile.size > 500000) {
      Swal.fire({
        icon: "warning",
        html: "El archivo es demasiado grande. El <strong>tamaño maximo</strong> es <strong>500KB.</strong>",
        customClass: {
          icon: "swal-icon-war",
        },
      });
      return;
    }

    setFormAddProduct({
      ...formAddProduct,
      [e.target.name]: selectedFile,
    });
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setProductPreview(imageURL);
  };

  const handleFormAddProduct = (e) => {
    setFormAddProduct({
      ...formAddProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitFormProduct = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("nameProduct", formAddProduct.producto);
    formData.append("file", formAddProduct.file);
    formData.append("category", formAddProduct.categoria);
    formData.append("description", formAddProduct.descripcion);
    formData.append("price", formAddProduct.precio);
    formData.append("stocks", formAddProduct.stock);
    formData.append("id", localStorage.id);
    try {
      const res = await fetch("http://localhost:7000/api/addProduct", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (json.msgOk) {      
        await Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: `${json.msgOk}`,
          timer: 1100,
          customClass: {
            icon: "swal-icon-succ",
            title: "swal-title",
          },
        });
        //actualizar todos los productos al agregar uno nuevo producto
        getAllProducts();
      }
      if (json.msgError) {
        await Swal.fire({
          icon: "error",
          showConfirmButton: false,
          text: `${json.msgError}`,
          timer: 1100,
          customClass: {
            icon: "swal-icon-err",
            title: "swal-title",
          },
        });
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

  const handleDeleteProduct = async (idP) => {
    const result = await Swal.fire({
      title: "¿Desea eliminar?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
        customClass: {
          icon: "swal-icon-war",
        },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:7000/api/deleteProduct/${idP}/${localStorage.id}`,
          {
            method: "DELETE",
          }
        );
        const json = await res.json();

        if (json.msgDelete) {
          await Swal.fire("¡Eliminado!", "Su archivo ha sido eliminado.", "success");
          setAddedProductData(json.newData);
          //actualizar todos los productos al eliminar uno nuevo producto
          getAllProducts();
        } else if (json.msgDeleteError) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${json.msgDeleteError}`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              icon: "swal-icon-err",
              title: "swal-title",
            },
          });
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
    }
  };



  const data = {
    handleFormEditProfile,
    handleEditImageProfile,
    formEditProfile,
    handleSubmitEditProfile,
    profilePreview,
    productPreview,
    handleFormAddProductFile,
    handleFormAddProduct,
    handleSubmitFormProduct,
    addedProductData,
    handleDeleteProduct,
    allProductsAdded
  };
  return (
    <DashboardContext.Provider value={data}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { DashboardProvider };
export default DashboardContext;
