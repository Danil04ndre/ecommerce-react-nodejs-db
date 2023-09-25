import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import FormContext from '../context/FormContext'

const ProtectedAccount = () => {

    const {isAuthUser} = useContext(FormContext)
  return isAuthUser ? <Outlet /> : <Navigate to="/login"/>
}

export default ProtectedAccount