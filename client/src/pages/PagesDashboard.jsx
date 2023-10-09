import { useParams } from 'react-router-dom';
import AddProducts from './dashboard/AddProducts';
import MyAccount from './dashboard/MyAccount';
import AllProducts from './dashboard/AllProducts';
import { useEffect } from 'react';
import MyProducts from './dashboard/MyProducts';

const PagesDashboard = () => {
  const { link } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [link]);
  return (
    <>
      {link == 'agregar-producto'
        ? <AddProducts />
        : link == 'gestion-productos' ? <AllProducts />
        : link == 'mis-productos' ? <MyProducts />
        : link == 'mi-cuenta' ? <MyAccount /> 
        : <MyAccount />}
    </>
  )
}

export default PagesDashboard