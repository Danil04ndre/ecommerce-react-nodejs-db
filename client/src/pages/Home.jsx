import { useContext } from "react"
import { Navigate } from "react-router-dom";
import FormContext from "../context/FormContext"


const Home = () => {
  const {isAuthEmployee} = useContext(FormContext);
  if(isAuthEmployee) {
    return <Navigate  to="/dashboard" />
  }
  return (
    <div>Home</div>
  )
}

export default Home