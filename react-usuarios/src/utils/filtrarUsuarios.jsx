
export function filtrarUsuarios(usuarios, texto) {
  const buscar = texto.trim().toLowerCase();

  const resultado = usuarios.filter((usuario) => {
    return usuario.name.toLowerCase().includes(buscar);
  });

  return resultado;
}
