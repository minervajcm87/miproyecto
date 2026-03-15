import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

import { useEffect, useState } from "react";

type Usuario = {
    id: number;
    name: string;
    // agrega otros campos si los necesitas
};


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargar = async () => {
            try {
                setError(null);
                const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!respuesta.ok) {
                    throw new Error("Error al cargar los usuarios");
                }
                const data = await respuesta.json();
                setUsuarios(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Ocurrió un error desconocido");
                }
            } finally {
                setLoading(false);
            }
        };

        cargar();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>{usuario.name}</li>
                ))}
            </ul>
        </div>
    );
}
