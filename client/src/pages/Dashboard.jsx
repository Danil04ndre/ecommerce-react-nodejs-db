import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContext from "../context/FormContext";
import "../css/Dashboard.css";
import PagesDashboard from "./PagesDashboard";


const Dashboard = () => {
  const goTo = useNavigate();
  const { setIsAuthEmployee } = useContext(FormContext);

  const handleSignout = () => {
    localStorage.removeItem("sessionEmployee");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("image");
    localStorage.removeItem("direction");
    localStorage.removeItem("telefone");

    setIsAuthEmployee(false);
    // Redirigir al usuario a la pagina de inicio
    goTo("/");
  };

 
  return (
    <div className="content-dashboard">
      <div className="panel">
        <div className="panel-content">
          <div className="content-img-profile">
            <img src={`data:image/png;base64,${localStorage.image}`} alt="" />
          </div>
          <div className="links-account">
            <p>{localStorage.name}</p>
            <p>{localStorage.email}</p>
          </div>

          <span>Navegacion</span>

          <div className="links-dashboard">
            <Link to="/dashboard/mi-cuenta">Mi cuenta</Link>
            <Link to="/dashboard/mis-productos">Mis productos agregados</Link>
            <Link to="/dashboard/agregar-producto">Agrear nuevo Producto</Link>
            <Link to="/dashboard/gestion-productos">Todos los Productos</Link>
            <Link to="/dashboard/gestion-usuarios">Gestion de Usuarios</Link>

          </div>
          <button onClick={handleSignout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar session</button>
        </div>
      </div>

      <div className="control">
        <PagesDashboard />

      </div>
    </div>
  );
};

export default Dashboard;
