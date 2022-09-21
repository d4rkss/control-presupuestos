import React from "react";
import FichaGasto from "./FichaGasto";

const ListadoGastos = ({
  gastos,
  setGastoeditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="contenedor listado-gastos">
      {gastos.length ? (
        <h2>Gastos Registrados: </h2>
      ) : (
        <h2> Aun no Tienes Gastos Registrados</h2>
      )}
      {filtro === ""
        ? gastos.map((gasto) => {
            return (
              <FichaGasto
                eliminarGasto={eliminarGasto}
                setGastoeditar={setGastoeditar}
                key={gasto.id}
                gasto={gasto}
              />
            );
          })
        : gastosFiltrados.map((gasto) => {
            return (
              <FichaGasto
                eliminarGasto={eliminarGasto}
                setGastoeditar={setGastoeditar}
                key={gasto.id}
                gasto={gasto}
              />
            );
          })}
    </div>
  );
};

export default ListadoGastos;
