import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
const FormContext = createContext();

const initialFormLogin = {
  email: "",
  contrasena: "",
};
const initialFormRegister = {
  nombre: "",
  email: "",
  contrasena: "",
  option: "",
};
const FormProvider = ({ children }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [formLogin, setFormLogin] = useState(initialFormLogin);
  const [formRegister, setFormRegister] = useState(initialFormRegister);
  const [emailNotFound, setEmailNotFound] = useState(null);
  const [falsePassword, setFalsePassword] = useState(null);
  const [isAuthEmployee, setIsAuthEmployee] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const goTo = useNavigate();


  useEffect(() => {

    if(localStorage.sessionEmployee == 'true'){
      setIsAuthEmployee(true)
    }else if(localStorage.sessionUser == 'true'){
      setIsAuthUser(true)
    }
   
  }, [])
  

  const handlePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleFormLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formRegister);
    try {
      const res = await fetch("http://localhost:7000/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formRegister),
      });
      const json = await res.json();
      console.log(res);
      console.log(json);

      if(json.msgEmail){
        Swal.fire({
          icon: 'warning',
          title: `${json.msgEmail}`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            icon: "swal-icon-war",
            title: "swal-title",
          },
        })
      }

      if(json.msg == 'ok'){
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${formRegister.option.charAt(0).toUpperCase() + formRegister.option.slice(1)} registrado.`,
          showConfirmButton: false,
          timer: 1100,
          customClass: {
            icon: "swal-icon-err",
            title: "swal-title",
          },
        });
        setFormRegister(initialFormRegister)
        goTo("/login")
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

  const handleLogin = async (e) =>{
    e.preventDefault();
   try {
    const res = await fetch("http://localhost:7000/api/login",{
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formLogin)
    })
    const json = await res.json();
    console.log(res);
    console.log(json);
    if(json.accountEmployee){
      await Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 950,
        customClass: {
          icon: "swal-icon-succ",
          title: "swal-title",
        },
      });
      localStorage.setItem("sessionEmployee",true);
      localStorage.setItem("id",json.idEmpleado);
      localStorage.setItem("email",json.email);
      localStorage.setItem("name",json.name);
      localStorage.setItem("image",json.image);

      setFormLogin(initialFormLogin);
      setIsAuthEmployee(true);
      goTo("/dashboard");
    }
    if(json.accountUser){      
      await Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 950,
        customClass: {
          icon: "swal-icon-succ",
          title: "swal-title",
        },

      });
      localStorage.setItem("sessionUser",true);
      localStorage.setItem("id",json.idUsuario);
      localStorage.setItem("email",json.email);
      localStorage.setItem("name",json.name);
      setFormLogin(initialFormLogin);
      setIsAuthUser(true);
      goTo("/");
    }
    console.log(json.msgEmail)
    if(json.msgEmail){
      setEmailNotFound(json.msgEmail);
      setFalsePassword(null);

    } else if(json.msgFalsePass){
      setFalsePassword(json.msgFalsePass);
      setEmailNotFound(null);

    }  else{
      setEmailNotFound(null);
      setFalsePassword(null);
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
  

  

  const data = {
    handlePassword,
    visiblePassword,
    handleFormLogin,
    formLogin,
    handleFormRegister,
    formRegister,
    handleSubmit,
    handleLogin,
    emailNotFound,
    falsePassword,
    isAuthEmployee,
    setIsAuthEmployee,
    isAuthUser,
    setIsAuthUser

  };
  return <FormContext.Provider value={data}>{children}</FormContext.Provider>;
};

export { FormProvider };
export default FormContext;
