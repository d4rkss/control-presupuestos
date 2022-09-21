import { useEffect } from "react";
import { useState } from "react";

import { formatearCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Controlpresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsvalidpresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(10);
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);

  const handleResetapp = () => {
    const respuesta = confirm(
      "Seguro Que Desea Reinicial El Presupuesto, se perderan todos los datos"
    );
    if (respuesta) {
      setGastos([]);
      setPresupuesto(0);
      setIsvalidpresupuesto(false);
    }
  };
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (Total, gasto) => gasto.cantidad + Total,
      0
    );

    const nuevoPorcentaje = (
      ((presupuesto - (presupuesto - totalGastado)) / presupuesto) *
      100
    ).toFixed(2);

    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 50);
  }, [gastos]);

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            textColor: porcentaje >= 100 ? "#DC2626" : "#3B82F6",
            pathColor: porcentaje >= 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={
            disponible >= 0
              ? `${porcentaje}% Gastado`
              : `${porcentaje - 100}% exedido `
          }
        />
      </div>

      <div className="contenido-presupuesto">
        <input
          className="reset-app"
          type="button"
          onClick={handleResetapp}
          value={"Reiniciar Aplicación"}
        />
        <p>
          Presupuesto: <span>{formatearCantidad(presupuesto)} </span>
        </p>
        <p className={`${disponible <= 0 && "negativo"}`}>
          {`${disponible > 0 ? "Disponible:" : "Sobre Gasto"} `}
          <span>{formatearCantidad(disponible)} </span>
        </p>
        <p>
          Gastos: <span>{formatearCantidad(gastado)} </span>
        </p>
      </div>
    </div>
  );
};

export default Controlpresupuesto;
