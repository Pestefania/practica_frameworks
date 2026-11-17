
function UsuarioCard({ usuario, esFavorito, cambiarFavorito }) {
  const inicial = usuario.name.charAt(0).toUpperCase();

  return (
    <div className="tarjeta">
      <div className="avatar">{inicial}</div>

      <h3>{usuario.name}</h3>

      <p className="dato">
        <span>Correo electrónico</span>
        {usuario.email}
      </p>

      <p className="dato">
        <span>Ciudad</span>
        {usuario.address.city}
      </p>

      <button
        className={esFavorito ? "boton-favorito activo" : "boton-favorito"}
        onClick={() => cambiarFavorito(usuario.id)}
      >
        {esFavorito ? "♥ Quitar favorito" : "♡ Agregar favorito"}
      </button>
    </div>
  );
}

export default UsuarioCard;
