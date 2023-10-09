import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import UserContext from "../context/UserContext";

const Catalogs = () => {
  const { setCategory,dataCategory,notFound } = useContext(UserContext);
  const { category } = useParams();

  useEffect(() => {
    setCategory(category);
    window.scrollTo(0, 0);
  }, [category, setCategory]); 

  return (
    <>
        <div className="content-cards content-category">
            {dataCategory.map((el,index) => (<Card key={index} producto={el}/>))}
        </div>
        {notFound ? <p className="not-found">{notFound}</p> : null}

    </>
  )
};

export default Catalogs;
