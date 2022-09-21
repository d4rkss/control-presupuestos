import { formatearFecha } from "../helpers";
import { formatearCantidad } from "../helpers";
// imagenes
import Ahorro from "../img/icono_ahorro.svg";
import Casa from "../img/icono_casa.svg";
import Comida from "../img/icono_comida.svg";
import Varios from "../img/icono_gastos.svg";
import Entretenimiento from "../img/icono_ocio.svg";
import Salud from "../img/icono_salud.svg";
import Subs from "../img/icono_suscripciones.svg";
//librerias
import {
  SwipeableListItem,
  LeadingActions,
  SwipeableList,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const DiccionarioDeIconos = {
  ahorro: Ahorro,
  comida: Comida,
  entretenimiento: Entretenimiento,
  casa: Casa,
  salud: Salud,
  gastos: Varios,
  suscripciones: Subs,
};

const FichaGasto = ({ gasto, setGastoeditar, setModal, eliminarGasto }) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoeditar(gasto)}> Editar</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => eliminarGasto(gasto.id)}>
        {" "}
        Eliminar{" "}
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={DiccionarioDeIconos[gasto.categoria]} alt="icono" />

            <div className="descripcion-gasto">
              <p className="categoria">{gasto.categoria}</p>
              <p className="nombre-gasto"> {gasto.nombre} </p>
              <p className="fecha-gasto">
                {" "}
                Agregado el: <span> {formatearFecha(gasto.fecha)}</span>
              </p>
            </div>
            <p className="cantidad-gasto">
              {formatearCantidad(gasto.cantidad)}
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default FichaGasto;
