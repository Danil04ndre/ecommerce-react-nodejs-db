import Header from "./components/Header";
import { Routes, Route, useNavigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import FormContext from "./context/FormContext";
import ProtectedDashboard from "./pages/ProtectedDashboard";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import Home from "./pages/Home";
import ProtectedAccount from "./pages/ProtectedAccount";
import Footer from "./components/Footer";
import Catalogs from "./pages/Catalogs";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import MyShopping from "./pages/MyShopping";

function App() {
  const { isAuthEmployee } = useContext(FormContext);
  const navigate = useNavigate();
  return (
    <>
      {!isAuthEmployee && <Header navigate={navigate}/>}

      <Routes>
        {/* user */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:category" element={<Catalogs />}/>
        <Route path="/:category/:id" element={<Detail />}/>
        <Route path="/cart" element={<Cart />}/>

        {/* dashboard */}
        <Route path="/" element={<ProtectedDashboard />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:link" element={<Dashboard />}/>
        </Route>
        <Route path="/" element={<ProtectedAccount />}>
          <Route path="/my-shopping" element={<MyShopping />} />
        </Route>

        {/* no se muestra por que existen rutas que tienen parametros creo saber que es por eso */}
        <Route path="*" element={<h1>NO EXISTE LA RUTA</h1>} />

      </Routes>
      {!isAuthEmployee && <Footer />}

    </>
  );
}

export default App;
