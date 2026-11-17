
export function filtrarUsuarios(usuarios, texto) {
  const buscar = texto.toLowerCase();

  return usuarios.filter((usuario) => {
    return usuario.name.toLowerCase().includes(buscar);
  });
}
