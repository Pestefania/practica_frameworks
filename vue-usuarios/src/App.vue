
<script setup>
import { ref, computed, onMounted } from "vue";
import UsuarioCard from "./components/UsuarioCard.vue";
import { filtrarUsuarios } from "./utils/filtrarUsuarios";

const usuarios = ref([]);
const busqueda = ref("");
const favoritos = ref([]);
const cargando = ref(true);
const error = ref("");
const verFavoritos = ref(false);

// Obtener usuarios de la API
async function obtenerUsuarios() {
  try {
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!respuesta.ok) {
      throw new Error("Error al consultar los usuarios");
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos)) {
      throw new Error("Los datos no son válidos");
    }

    usuarios.value = datos;
  } catch (e) {
    error.value = e.message;
  } finally {
    cargando.value = false;
  }
}

// Agregar o quitar favoritos
function cambiarFavorito(id) {
  if (favoritos.value.includes(id)) {
    favoritos.value = favoritos.value.filter(
      (numero) => numero !== id
    );
  } else {
    favoritos.value.push(id);
  }
}

// Mostrar los usuarios que coinciden con la búsqueda
const usuariosFiltrados = computed(() => {
  let lista = filtrarUsuarios(usuarios.value, busqueda.value);

  if (verFavoritos.value) {
    lista = lista.filter((usuario) =>
      favoritos.value.includes(usuario.id)
    );
  }

  return lista;
});

onMounted(obtenerUsuarios);
</script>

<template>
  <div class="contenedor">
    <header class="encabezado">
      <div class="icono-principal">♡</div>
      <h1>Mi directorio de usuarios</h1>
      <p>Encuentra usuarios y guarda tus favoritos</p>
    </header>

    <div class="panel">
      <div class="buscador">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar usuario por nombre..."
        />

        <button
          class="boton-filtro"
          @click="verFavoritos = !verFavoritos"
        >
          {{ verFavoritos ? "Mostrar todos" : "♡ Ver favoritos" }}
        </button>
      </div>

      <div class="informacion">
        <h2>
          {{ verFavoritos ? "Mis favoritos" : "Todos los usuarios" }}
        </h2>

        <span class="contador">
          ♡ {{ favoritos.length }} favoritos
        </span>
      </div>
    </div>

    <p v-if="cargando" class="mensaje">Cargando...</p>

    <p v-else-if="error" class="mensaje error">
      {{ error }}
    </p>

    <template v-else>
      <div class="lista">
        <UsuarioCard
          v-for="usuario in usuariosFiltrados"
          :key="usuario.id"
          :usuario="usuario"
          :esFavorito="favoritos.includes(usuario.id)"
          @cambiar-favorito="cambiarFavorito"
        />
      </div>

      <p v-if="usuariosFiltrados.length === 0" class="mensaje">
        No se encontraron usuarios.
      </p>
    </template>

    <footer>Práctica de frameworks web - Vue</footer>
  </div>
</template>
