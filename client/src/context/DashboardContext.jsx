import { createContext, useState } from "react";






const DashboardContext = createContext()
const initialFormEditProfile = {
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  file: ""
}
const DashboardProvide = ({ children }) => {

  const [formEditProfile, setFormEditProfile] = useState(initialFormEditProfile);


  const handleEditImagenProfile = (e) => {
    console.log(e.target.files[0]);
    setFormEditProfile({
      ...formEditProfile,
      [e.target.name]: e.target.files[0],
    })
  }
  const handleFormEditProfile = (e) => {
    setFormEditProfile({
      ...formEditProfile,
      [e.target.name]: e.target.value,
    })
  }

  const formData = new FormData();
  formData.append("nombre",formEditProfile.nombre);
  formData.append("email",formEditProfile.email);
  formData.append("telefono",formEditProfile.telefono);
  formData.append("direccion",formEditProfile.direccion);
  formData.append("imagen",formEditProfile.file);
  console.log(localStorage.id)
  const handleSubmitEditProfile  = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:7000/api/updateProfile/${localStorage.id}`,{
        method: "PUT",
        headers: {
          'content-type': 'application/json'
        },
        body: formData
      });
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  const data = {
    handleFormEditProfile,
    handleEditImagenProfile,
    formEditProfile,
    handleSubmitEditProfile

  }
  return <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
}

export { DashboardProvide };
export default DashboardContext;
