import React from "react";
import Nuevopresupuesto from "./Nuevopresupuesto";
import Controlpresupuesto from "./Controlpresupuesto";
const Header = ({
  isValidPresupuesto,
  setIsvalidpresupuesto,
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto === true ? (
        <Controlpresupuesto
          setGastos={setGastos}
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsvalidpresupuesto={setIsvalidpresupuesto}
        ></Controlpresupuesto>
      ) : (
        <Nuevopresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsvalidpresupuesto={setIsvalidpresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
