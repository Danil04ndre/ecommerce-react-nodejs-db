import { createContext, useState } from "react";
import Swal from "sweetalert2";

const DashboardContext = createContext()
const initialFormEditProfile = {
  nombre: localStorage.name || "",
  email: localStorage.email || "",
  telefono: localStorage.telefone || "",
  direccion: localStorage.direction || "",
  file: ""
}

const initialFormAddProduct = {
  producto: "",
  file: "",
  categoria: "",
  descripcion: "",
  precio: "",
  stock: ""


}
console.log(localStorage.imageBuffer)

const DashboardProvide = ({ children }) => {
  const [formEditProfile, setFormEditProfile] = useState(initialFormEditProfile);
  const [profilePreview, setProfilePreview] = useState(null);
  const [formAddProduct, setFormAddProduct] = useState(initialFormAddProduct)
  
  //myaccount

  const handleEditImageProfile = (e) => {
    console.log(e.target.files[0]);
    setFormEditProfile({
      ...formEditProfile,
      [e.target.name]: e.target.files[0],
    })

   const imageURL = URL.createObjectURL(e.target.files[0]);
   setProfilePreview(imageURL);
  }
  const handleFormEditProfile = (e) => {
    setFormEditProfile({
      ...formEditProfile,
      [e.target.name]: e.target.value,
    })
  }

  //Dato raro, he intentado muchas veces mandar los datos, sin el file (imagen)
  //y no lo puedo ver los datos enviados por la consola del node, pero si agrego la imagen
  // ahi recien se puede, en conlucion: si quiero mandar datos con imagen utilizo formData
  //si quiero mandar datos de solo texto utilizo JSON
  const handleSubmitEditProfile  = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre",formEditProfile.nombre);
    formData.append("email",formEditProfile.email);
    formData.append("telefono",formEditProfile.telefono);
    formData.append("direccion",formEditProfile.direccion);
    formData.append("file",formEditProfile.file);
    try {
      const res = await fetch(`http://localhost:7000/api/updateProfile/${localStorage.id}`,{
        method: "PUT",
        body: formData
      });
      console.log(res);
      const json = await res.json();
      console.log(json);
      console.log(json.msgUpdateOk);
      if(json.msgFile){
        await Swal.fire({
          icon: 'warning',
          showConfirmButton: false,
          text: `${json.msgFile}`,
          timer: 2800,
          customClass: {
            icon: "swal-icon-war",
            title: "swal-title",
          },
  
        });
      }
      if(json.msgUpdateOk){
        localStorage.setItem("id",json.idEmpleado);
        localStorage.setItem("name",json.name);
        localStorage.setItem("image",json.image);
        localStorage.setItem("telefone",json.telefone);
        localStorage.setItem("direction",json.direction);
        await Swal.fire({
          icon: 'success',
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
  }
  
  //addproduct
  

  const handleFormAddProductFile = (e) => {
    setFormAddProduct({
      ...formAddProduct,
      [e.target.name]: e.target.files[0]
    })
  }
  const handleFormAddProduct = (e) => {
    setFormAddProduct({
      ...formAddProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitFormProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData;
    formData.append("nameProduct",formAddProduct.producto);
    formData.append("file",formAddProduct.file);
    formData.append("category",formAddProduct.categoria);
    formData.append("description",formAddProduct.descripcion);
    formData.append("price",formAddProduct.precio);
    formData.append("stocks",formAddProduct.stock);
    formData.append("id",localStorage.id);
    try {
      const res = await fetch("http://localhost:7000/api/addProduct",{
        method: "POST",
        body: formData
      })
      console.log(res);

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
  
  const data = {
    handleFormEditProfile,
    handleEditImageProfile,
    formEditProfile,
    handleSubmitEditProfile,
    profilePreview, 
    handleFormAddProductFile,
    handleFormAddProduct,
    handleSubmitFormProduct
  }
  return <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
}

export { DashboardProvide };
export default DashboardContext;
