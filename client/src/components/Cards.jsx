import { useContext } from "react"
import UserContext from "../context/UserContext"
import Card from "./Card"


const Cards = () => {
    const {lastestProducts} = useContext(UserContext)
  return (
    <div className="content-cards">
        {lastestProducts.map((el,index) => <Card key={index} producto={el}/>)}
    </div>
  )
}

export default Cards