import { useContext } from "react"
import { Navigate } from "react-router-dom";
import FormContext from "../context/FormContext"
import HeroSlide from "../components/HeroSlide";
import SubSlide from "../components/SubSlide";
import Cards from "../components/Cards";


const Home = () => {
  const { isAuthEmployee } = useContext(FormContext);
  if (isAuthEmployee) {
    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <HeroSlide />
      <SubSlide />
      <Cards />
    </>
  )
}

export default Home