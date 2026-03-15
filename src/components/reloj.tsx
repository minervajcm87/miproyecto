import { useEffect, useState } from "react";

export default function Reloj() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date();
      setHora(ahora.toLocaleTimeString());
      setFecha(ahora.toLocaleDateString());
    };

    actualizar();
    const intervalo = setInterval(actualizar, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="reloj">
      <div className="reloj-hora">{hora}</div>
      <div className="reloj-fecha">{fecha}</div>
    </div>
  );
}