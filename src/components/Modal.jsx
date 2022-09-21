import { useState, useEffect } from "react";
import cerraricono from "../img/cerrar.svg";
import Mensaje from "./Mensaje";
const Modal = ({
  setModal,
  amodal,
  setAmodal,
  guardarGasto,
  gastoeditar,
  setGastoeditar,
}) => {
  const [mensaje, setMensaje] = useState();

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoeditar).length > 0) {
      setNombre(gastoeditar.nombre);
      setCantidad(gastoeditar.cantidad);
      setCategoria(gastoeditar.categoria);
      setId(gastoeditar.id);
    }
  }, []);

  const cerrarModal = () => {
    setAmodal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
    setGastoeditar({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);

      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerraricono} alt="cerrarelmodal" onClick={cerrarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${amodal ? "animar" : "cerrar"}`}
      >
        <legend>
          {gastoeditar.id ? `Editando ${gastoeditar.nombre}` : "Nuevo gasto"}
        </legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombreDeGasto">Nombre del Gasto:</label>
          <input
            id="nombreDeGastp"
            value={nombre}
            placeholder="Nombre De Gasto"
            type="text"
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="cantidadDeGasto">Cantidad del Gasto:</label>
          <input
            value={cantidad}
            id="cantidadDeGasto"
            placeholder="Monto De Gasto"
            type="number"
            onChange={(e) => setCantidad(Number(e.target.value))}
          />

          <label htmlFor="categoria">Tipo</label>
          <select
            id="categoria"
            placeholder="Seleccione"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value=""> //---Seleccione---// </option>
            <option value="ahorro">Ahorro </option>
            <option value="comida">Comida </option>{" "}
            <option value="entretenimiento">Entretenimiento </option>{" "}
            <option value="casa">Casa </option>{" "}
            <option value="salud">Salud </option>{" "}
            <option value="gastos">Gatos varios </option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoeditar.id ? "Guardar Cambios" : "Registrar Gastos"}
        />
      </form>
    </div>
  );
};

export default Modal;
