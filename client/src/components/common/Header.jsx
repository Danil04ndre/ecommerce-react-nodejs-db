import "../../css/Header.css";
import logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useContext } from "react";
import FormContext from "../../context/FormContext";

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [showLinks, setShowLinks] = useState(false);


  const {isAuthUser,setIsAuthUser} = useContext(FormContext)
  const goTos = useNavigate();

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
    // dentro de <Routes> sino fuera.

    goTos("/");
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
                <Link to="/account" className="account">
                  <i className="fa-solid fa-user"></i>
                  <span>{localStorage.name ? localStorage.name : 'Mi Cuenta'}</span>
              </Link>
              }
              <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''}>Inicio</NavLink>
              <NavLink to="/laptops" className={({isActive}) => isActive ? 'active-link' : ''}>Laptops</NavLink>
              <NavLink to="/computadoras" className={({isActive}) => isActive ? 'active-link' : ''}>Computadoras</NavLink>
              <NavLink to="/teclados" className={({isActive}) => isActive ? 'active-link' : ''}>Teclados</NavLink>
              <NavLink to="/impresoras" className={({isActive}) => isActive ? 'active-link' : ''}>Impresoras</NavLink>
              <NavLink to="/mouse" className={({isActive}) => isActive ? 'active-link' : ''}>Mouse</NavLink>
              <NavLink to="/otros" className={({isActive}) => isActive ? 'active-link' : ''}>Otros</NavLink>
              
              {!activeNav && 
                <Link to="/account" className="account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <i className="fa-solid fa-user"></i>
                  <span>{localStorage.name ? localStorage.name : 'Mi Cuenta'}</span>
                  {showLinks && isAuthUser && (
                    <div className="account-links">
                      <Link to="/account">Mi Cuenta</Link>
                      <Link to="/compras">Mis Comprass</Link>
                      <button onClick={handleSignout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</button>
                    </div>
                  )}

              </Link>
              }
              </nav>
            </div>
            <Link to="/cart" className="content-cart">
              <button className="cart" onClick={() => console.log("hola")} ref={refCart}>
                <i className="fa-solid fa-cart-shopping"></i>
                <span>Carrito</span>
                <span className="counter">7</span>
              </button>
            </Link>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
