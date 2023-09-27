import { useParams } from 'react-router-dom';
import AddProduct from './dashboard/AddProduct';
import GestionUsers from './dashboard/GestionUsers';
import GestionClients from './dashboard/GestionClients';
import GestionEmployees from './dashboard/GestionEmployees';
import MyAccount from './dashboard/MyAccount';

const PagesDashboard = () => {
  const { link } = useParams()
  console.log(link)
  return (
    <>
      {link == 'agregar-producto'
        ? <AddProduct />
        : link == 'gestion-productos' ? <GestionUsers />
        : link == 'gestion-clientes' ? <GestionClients />
        : link == 'gestion-empleados' ? <GestionEmployees /> 
        : link == 'mi-cuenta' ? <MyAccount /> 
        : <MyAccount />}
    </>
  )
}

export default PagesDashboard