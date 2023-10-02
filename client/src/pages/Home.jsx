import { useContext } from "react"
import { Navigate } from "react-router-dom";
import FormContext from "../context/FormContext"
import HeroSlide from "../components/users/HeroSlide";


const Home = () => {
  const { isAuthEmployee } = useContext(FormContext);
  if (isAuthEmployee) {
    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <HeroSlide />
    </>
  )
}

export default Home