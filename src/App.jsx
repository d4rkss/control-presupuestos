import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarID } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";
import { object } from "prop-types";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem("presupuesto")
  );
  const [isValidPresupuesto, setIsvalidpresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [amodal, setAmodal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoeditar, setGastoeditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  // presupuesto en Local Storage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = localStorage.getItem("presupuesto") ?? 0;
    if (presupuestoLS > 0) {
      setIsvalidpresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(gastoeditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAmodal(true);
      }, 250);
    }
  }, [gastoeditar]);

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gasto.id === gastoState.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      gasto.fecha = Date.now();
      gasto.id = generarID();
      setGastos([...gastos, gasto]);
    }

    setAmodal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const handleNuevoGasto = () => {
    setGastoeditar({});
    setModal(true);

    setTimeout(() => {
      setAmodal(true);
    }, 250);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidpresupuesto={setIsvalidpresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              eliminarGasto={eliminarGasto}
              setModal={setModal}
              setGastoeditar={setGastoeditar}
              gastos={gastos}
            ></ListadoGastos>
          </main>
          <div className="nuevo-gasto">
            <img
              onClick={handleNuevoGasto}
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setGastoeditar={setGastoeditar}
          guardarGasto={guardarGasto}
          amodal={amodal}
          setModal={setModal}
          setAmodal={setAmodal}
          gastoeditar={gastoeditar}
        ></Modal>
      )}
    </div>
  );
}

export default App;
