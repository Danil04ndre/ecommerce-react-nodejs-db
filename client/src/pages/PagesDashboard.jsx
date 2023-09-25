
import { useParams } from 'react-router-dom';
import AddProduct from './dashboard/AddProduct';
import GestionUsers from './dashboard/GestionUsers';


const PagesDashboard = () => {



  const {link} = useParams()
  console.log(link)
  return (
    <>
      
    {link == 'agregar-producto' ? <AddProduct/> : <GestionUsers/> }
    </>
  )
}

export default PagesDashboard