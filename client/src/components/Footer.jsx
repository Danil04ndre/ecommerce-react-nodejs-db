import "../css/Footer.css";

import footer1 from "../assets/footer1.svg";
import footer2 from "../assets/footer2.svg";
import footer3 from "../assets/footer3.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <img src={footer1} />
        <p className="title">Paga con Mercado Pago</p>
        <p className="text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
          similique recusandae tenetur dolores officia corporis iure.
        </p>
        <p className="question">Como pagar con Mercado Pago</p>
      </div>
      <div>
        <img src={footer2} />
        <p className="title">Envio gratis desde S/.79</p>
        <p className="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          in!
        </p>
        <p className="question">Como recibo compras con envios</p>
      </div>
      <div>
        <img src={footer3} />
        <p className="title">Seguridad, de principio a fin</p>
        <p className="text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
          inventore ab temporibus mollitia voluptas excepturi?
        </p>
        <p className="question">Como te protegemos</p>
      </div>
    </footer>
  );
};

export default Footer;
