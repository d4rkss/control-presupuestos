export const generarID = () => {
  const random = Math.random().toString(36).suctr;
  const fecha = Date.now().toString(36);
  return fecha + random;
};

export const formatearFecha = (fecha) => {
  const fechanueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechanueva.toLocaleDateString("es-ES", opciones);
};

export const formatearCantidad = (cantidad) => {
  return cantidad.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};
