import "../css/Header.css";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useContext } from "react";
import FormContext from "../context/FormContext";
import UserContext from "../context/UserContext";

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [showLinks, setShowLinks] = useState(false);


  const {isAuthUser,setIsAuthUser} = useContext(FormContext);
  const {cart} = useContext(UserContext);
  // const goTo = useNavigate();
  const totalQuantity = cart.reduce((total, producto) => total + producto.cantidad, 0);

  const handleMouseEnter = () => {
    setShowLinks(true);
  };

  const handleMouseLeave = () => {
    setShowLinks(false);
  };

  const handleSignout = () =>{
    localStorage.removeItem("sessionUser");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsAuthUser(false)
    // Redirigir al usuario a la pagina de inicio,
    // pero no me funciona por que el componente Header no esta 
    // dentro de <Routes> sino fuera. tambien intente pasado una propiedad navigate={useNavigate()}
    // pero aun asi nada

    // goTo("/");

    window.location.href = "/";
 
  }

  const refCart = useRef(null);
  const handleActive = () => {

    setActiveNav((prevActiveNav) => {
      const newActiveNav = !prevActiveNav;
      if (newActiveNav) {
        refCart.current.style.pointerEvents = "none";
      } else {
        refCart.current.style.pointerEvents = "auto";
      }
      return newActiveNav;
    });
  };

  return (
    <>
      <header>
        <div className="header">
          <div className="btn-nav">
            <button onClick={handleActive}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          <div className="links">
            <div className={`content-nav ${activeNav ? 'active-nav' : ''}`} onClick={() => setActiveNav(false)}>
              <nav className={activeNav ? 'active-nav-links' : ''}>
              {activeNav && <button className="close" onClick={() => setActiveNav(false)}><i className="fa-solid fa-xmark"></i></button> }
              
              {activeNav && 
              <>
                <Link className="account" to={!isAuthUser ? '/login' : null}>
                  <i className="fa-solid fa-user"></i>
                  <span>{localStorage.name ? localStorage.name : 'Mi Cuenta'}</span>
                </Link>
                <Link to="/my-shopping">
                <span>Mis Compras</span>
                </Link>
              </>
              }
              <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''}>Inicio</NavLink>
              <NavLink to="/laptops" className={({isActive}) => isActive ? 'active-link' : ''}>Laptops</NavLink>
              <NavLink to="/computadoras" className={({isActive}) => isActive ? 'active-link' : ''}>Computadoras</NavLink>
              <NavLink to="/teclados" className={({isActive}) => isActive ? 'active-link' : ''}>Teclados</NavLink>
              <NavLink to="/impresoras" className={({isActive}) => isActive ? 'active-link' : ''}>Impresoras</NavLink>
              <NavLink to="/mouse" className={({isActive}) => isActive ? 'active-link' : ''}>Mouse</NavLink>
              <NavLink to="/otros" className={({isActive}) => isActive ? 'active-link' : ''}>Otros</NavLink>
              {activeNav && isAuthUser && <button onClick={handleSignout} className="logout">Cerrar sesion</button>}
              {!activeNav && 
                <Link to={!isAuthUser ? '/login' : null} className="account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <i className="fa-solid fa-user"></i>
                  <span>{localStorage.name ? localStorage.name : 'Mi Cuenta'}</span>
                  {showLinks && isAuthUser && (
                    <div className="account-links">
                      <Link to="/my-shopping">Mis Compras</Link>
                      <button onClick={handleSignout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesion</button>
                    </div>
                  )}
              </Link>
              }
              </nav>
            </div>
            <Link to="/cart" className="content-cart quantity-active">
              <button className="cart" ref={refCart}>
                <i className="fa-solid fa-cart-shopping"></i>
                {totalQuantity != 0 ? <span className="counter">{totalQuantity}</span> : null}
                </button>
            </Link>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
