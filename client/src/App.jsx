import Header from "./components/common/Header";
import { Routes, Route, useNavigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import FormContext from "./context/FormContext";
import ProtectedDashboard from "./pages/ProtectedDashboard";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import Home from "./pages/Home";
import ProtectedAccount from "./pages/ProtectedAccount";
import Account from "./pages/Account";
import PagesDashboard from "./pages/PagesDashboard";


function App() {
  const { isAuthEmployee } = useContext(FormContext);
  const navigate = useNavigate();
  return (
    <>
      {!isAuthEmployee && <Header navigate={navigate}/>}
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedDashboard />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:link" element={<Dashboard />}/>
        </Route>

        <Route path="/" element={<ProtectedAccount />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="*" element={<h1>NO EXISTE LA RUTA</h1>} />

      </Routes>
    </>
  );
}

export default App;
