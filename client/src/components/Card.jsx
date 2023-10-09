import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 

import "../css/Card.css";
const Card = ({ producto,children }) => {
  let { idProducto, imagen, precio, nombreProducto, descripcion,categoria } = producto;
  return (
    <Link to={`/${categoria.toLowerCase()}/${idProducto}`} className="card">
      <div className="data-img">
        <img src={`data:image/png;base64,${imagen}`} alt="" />
      </div>

      <div className="info">
        <p className="c">{nombreProducto}</p>
        <small>Envio gratis</small>
        <p>{descripcion}</p>
        <p className="c price">S/.{precio}</p>
        {children}
      </div>
    </Link>
  );
};

Card.propTypes = {
    producto: PropTypes.object.isRequired, 
    children: PropTypes.node
};
export default Card;
