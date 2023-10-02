import { useContext } from "react";
import DashboardContext from "../../context/DashboardContext";

const AddProducts = () => {
  const {handleFormAddProduct,handleFormAddProductFile,handleSubmitFormProduct,productPreview} = useContext(DashboardContext);
  return (
    <>
      <div className="content-add-product">
        <form className="form-add-product" onSubmit={handleSubmitFormProduct}>
          <h2>Agregar Producto</h2>
          <div>
            <label>Nombre Producto</label>
            <br />
            <input type="text" name="producto" onChange={handleFormAddProduct}/>
          </div>
          <div>
            <label>Categoria</label>
            <br />
            <select name="categoria" onChange={handleFormAddProduct} defaultValue="">
              <option value="" disabled>Seleccione una categoria</option>
              <option value="Laptops">Laptops</option>
              <option value="Computadoras">Computadoras</option>
              <option value="Teclados">Teclados</option>
              <option value="Impresoras">Impresoras</option>
              <option value="Mouse">Mouse</option>
              <option value="Otros">Otros</option>
          </select>
          </div>
          <div>
          <label htmlFor="product" className="img-product"><i className="fa-regular fa-circle-up"></i>Adjuntar imagen</label>
            <br />
            <input type="file" id="product" name="file" onChange={handleFormAddProductFile}/>
            <div className="content-img-product">
            <img src={productPreview} alt="" />
          </div>
          </div>
          <div>
            <label className="label-textarea">Descripcion Producto</label> <br />
            <textarea name="descripcion" id="" cols="30" rows="5" onChange={handleFormAddProduct}></textarea >
          </div>
          <div>
            <label>Precio</label>
            <br />
            <input type="number" name="precio" onChange={handleFormAddProduct}/>
          </div>
          <div>
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

export default AddProducts;
