import { useContext } from "react"
import { Outlet,Navigate } from "react-router-dom"
import FormContext from "../context/FormContext"


const ProtectedDashboard = () => { 
    const {isAuthEmployee} = useContext(FormContext);

  return isAuthEmployee  ? <Outlet /> : <Navigate to="/login"/>
}

export default ProtectedDashboard