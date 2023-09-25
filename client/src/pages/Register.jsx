import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "../css/Register.css";
import FormContext from "../context/FormContext";

const Register = () => {
  const {
    isAuthEmployee,
    isAuthUser,
    visiblePassword,
    handlePassword,
    handleFormRegister,
    formRegister,
    handleSubmit,
  } = useContext(FormContext);
  

  if (isAuthEmployee) {
    return <Navigate to="/dashboard" />;
  } else if (isAuthUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="content-form">
      <form onSubmit={handleSubmit}>
        <h1>Crear una cuenta</h1>
        <span>Lorem ipsum dolor sit amet.</span>
        <div className="">
          <input
            type="text"
            maxLength="18"
            placeholder="Nombre de usuario"
            required
            name="nombre"
            onChange={handleFormRegister}
            value={formRegister.nombre}
          />
          <i className="fa-regular fa-user"></i>
        </div>
        <div className="">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleFormRegister}
            value={formRegister.email}
          />
          <i className="fa-regular fa-envelope"></i>
        </div>
        <div className="">
          <input
            type={!visiblePassword ? "password" : "text"}
            placeholder="Contraseña"
            required
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{5,}$"
            title="La contraseña debe contener al menos 5 caracteres, incluyendo numeros y letras."
            name="contrasena"
            onChange={handleFormRegister}
            value={formRegister.contrasena}
          />

          {!visiblePassword ? (
            <i className="fa-regular fa-eye-slash" onClick={handlePassword}></i>
          ) : (
            <i className="fa-regular fa-eye" onClick={handlePassword}></i>
          )}
        </div>
        <small className="rol">Elige tu rol</small>
        <div className="radio-container">
          <input
            type="radio"
            id="user"
            required
            name="option"
            value="usuario"
            onChange={handleFormRegister}
          />
          <label htmlFor="user">Usuario</label>
          <input
            type="radio"
            id="employe"
            required
            name="option"
            value="empleado"
            onChange={handleFormRegister}
          />
          <label htmlFor="employe">Empleado</label>
        </div>
        <small>
          <strong>Usuario: </strong>
          Catálogo de productos, añade tus favoritos al carrito.
        </small>
        <br />
        <small>
          <strong>Empleado: </strong>
          Añade nuevos productos a nuestro catálogo, etc.
        </small>
        <input type="submit" value="Crear cuenta" />
        <small className="acount-list">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">
            <strong>Inicia Sesión</strong>
          </Link>
        </small>
      </form>
      <br />
      <Link to="/panel">sistema go</Link>
    </div>
  );
};

export default Register;
