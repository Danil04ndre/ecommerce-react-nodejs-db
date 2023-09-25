import { useContext } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import FormContext from "../context/FormContext";
import "../css/Dashboard.css";
import profileDefault from "../assets/user-default.png";
import PagesDashboard from "./PagesDashboard";
const Dashboard = () => {
  const goTo = useNavigate();
  const { setIsAuthEmployee } = useContext(FormContext);

  const handleSignout = () => {
    localStorage.removeItem("sessionEmployee");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsAuthEmployee(false);
    // Redirigir al usuario a la pagina de inicio
    goTo("/");
  };

    const h = useParams();
  console.log(h)
  return (
    <div className="content-dashboard">
      <div className="panel">
        <div className="panel-links">
          <div className="content-img-profile">
            <img src={profileDefault} alt="" />
          <Link to="mi-cuenta">{localStorage.name}</Link>
          </div>


          <Link to="/dashboard/agregar-producto">Agrear nuevo Producto</Link>
          <Link to="/dashboard/gestion-productos">Gestion de Productos</Link>
          <Link to="/dashboard/gestion-clientes">Gestion de Clientes</Link>
          <Link to="/dashboard/gestion-empleados">Gestion de Empleados</Link>
          <button onClick={handleSignout}>cerrar session</button>
        </div>
      </div>

      <div className="control">
      <PagesDashboard />
        
      </div>
    </div>
  );
};

export default Dashboard;
