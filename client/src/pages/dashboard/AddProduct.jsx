const AddProduct = () => {
  return (
    <>
      <div className="content-add-product">
        <form className="form-add-product">
          <h2>Agregar Producto</h2>

          <div className="">
            <label>Nombre Producto</label>
            <br />
            <input type="text" name="nombre" />
          </div>
          <div className="">
            <label>Imagen</label>
            <br />
            <label htmlFor="product" className="img-product"><i className="fa-regular fa-circle-up"></i>Adjuntar imagen</label>
            <input type="file" id="product"/>
          </div>
          <div className="content-img-product">
            <img src="" alt="" />
          </div>
          <div className="">
            <label>Categoria</label>
            <br />
            <input type="text" name="direccion" />
          </div>
          <div className="">
            <label>Descripcion Producto</label> <br />
            <textarea name="descripcion" id="" cols="30" rows="5"></textarea>
          </div>
          <div className="">
            <label>Precio</label>
            <br />
            <input type="number" name="email" />
          </div>
          <div className="t">
            <label>Stock</label>
            <br />
            <input type="number" name="direccion" />
          </div>

          <input type="submit" value="Añadir producto"/>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
