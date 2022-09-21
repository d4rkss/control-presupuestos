import { useState } from "react";
import Mensaje from "./Mensaje";

const Nuevopresupuesto = ({
  isValidPresupuesto,
  setIsvalidpresupuesto,
  presupuesto,
  setPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje("no es valido");

      return;
    }
    setMensaje("");

    setIsvalidpresupuesto(true);
  };
  return (
    <div className="contenedor-presupuesto sombra ">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label> Definir Presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu Presupuesto"
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default Nuevopresupuesto;
