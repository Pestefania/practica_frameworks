
import { useState, useEffect } from "react";
import UsuarioCard from "./components/UsuarioCard";
import { filtrarUsuarios } from "./utils/filtrarUsuarios";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [verFavoritos, setVerFavoritos] = useState(false);

  useEffect(() => {
    async function obtenerUsuarios() {
      try {
        const respuesta = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los usuarios");
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("Los datos recibidos no son válidos");
        }

        setUsuarios(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerUsuarios();
  }, []);

  function cambiarFavorito(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((numero) => numero !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  let usuariosFiltrados = filtrarUsuarios(usuarios, busqueda);

  if (verFavoritos) {
    usuariosFiltrados = usuariosFiltrados.filter((usuario) =>
      favoritos.includes(usuario.id)
    );
  }

  return (
    <div className="contenedor">
      <header className="encabezado">
        <div className="icono-principal">♡</div>
        <h1>Mi directorio de usuarios</h1>
        <p>Encuentra usuarios y guarda tus favoritos</p>
      </header>

      <div className="panel">
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar usuario por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <button
            className="boton-filtro"
            onClick={() => setVerFavoritos(!verFavoritos)}
          >
            {verFavoritos ? "Mostrar todos" : "♡ Ver favoritos"}
          </button>
        </div>

        <div className="informacion">
          <h2>{verFavoritos ? "Mis favoritos" : "Todos los usuarios"}</h2>

          <span className="contador">
            ♡ {favoritos.length} favoritos
          </span>
        </div>
      </div>

      {cargando ? (
        <p className="mensaje">Cargando...</p>
      ) : error ? (
        <p className="mensaje error">{error}</p>
      ) : (
        <>
          <div className="lista">
            {usuariosFiltrados.map((usuario) => (
              <UsuarioCard
                key={usuario.id}
                usuario={usuario}
                esFavorito={favoritos.includes(usuario.id)}
                cambiarFavorito={cambiarFavorito}
              />
            ))}
          </div>

          {usuariosFiltrados.length === 0 && (
            <p className="mensaje">No se encontraron usuarios.</p>
          )}
        </>
      )}

      <footer>Práctica de frameworks web - React</footer>
    </div>
  );
}

export default App;
