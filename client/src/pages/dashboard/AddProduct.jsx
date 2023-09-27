import { useContext } from "react";
import DashboardContext from "../../context/DashboardContext";

const AddProduct = () => {
  const {handleFormAddProduct,handleFormAddProductFile,handleSubmitFormProduct} = useContext(DashboardContext);
  return (
    <>
      <div className="content-add-product">
        <form className="form-add-product" onSubmit={handleSubmitFormProduct}>
          <h2>Agregar Producto</h2>
          <div className="">
            <label>Nombre Producto</label>
            <br />
            <input type="text" name="producto" onChange={handleFormAddProduct}/>
          </div>
          <div className="">
            <label>Imagen</label>
            <br />
            <label htmlFor="product" className="img-product"><i className="fa-regular fa-circle-up"></i>Adjuntar imagen</label>
            <input type="file" id="product" name="file" onChange={handleFormAddProductFile}/>
          </div>
          <div className="content-img-product">
            <img src="" alt="" />
          </div>
          <div className="">
            <label>Categoria</label>
            <br />
            <input type="text" name="categoria" onChange={handleFormAddProduct}/>
          </div>
          <div className="">
            <label>Descripcion Producto</label> <br />
            <textarea name="descripcion" id="" cols="30" rows="5" onChange={handleFormAddProduct}></textarea >
          </div>
          <div className="">
            <label>Precio</label>
            <br />
            <input type="number" name="precio" onChange={handleFormAddProduct}/>
          </div>
          <div className="t">
            <label>Stock</label>
            <br />
            <input type="number" name="stock" onChange={handleFormAddProduct}/>
          </div>
          <input type="submit" value="Añadir producto"/>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
