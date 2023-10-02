import { createContext, useEffect, useState } from "react";





const UserContext = createContext();



const UserProvider = ({ children }) => {
  const [getDataProducts, setGetDataProducts] = useState([]);
  useEffect(() => {
    const getDataProducts = async () =>{
      try {
        const res = await fetch("http://localhost:7000/api/getAllProducts");
        const json = await res.json();

        if(json.getAllProductData){
          setGetDataProducts(json.getAllProducts.slice(-4))
        }
        
        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Error: ${err.status} ${err.statusText}`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            icon: "swal-icon-err",
            title: "swal-title",
          },
        });
      }
    }

    getDataProducts();
  }, [])
  



  const data = {
    getDataProducts

  }
  return <UserContext.Provider value={data}> {children} </UserContext.Provider>
}


export { UserProvider };
export default UserContext;
