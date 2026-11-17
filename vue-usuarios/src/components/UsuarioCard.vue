
<script setup>
defineProps({
  usuario: Object,
  esFavorito: Boolean
});

const emit = defineEmits(["cambiar-favorito"]);

function marcarFavorito(id) {
  emit("cambiar-favorito", id);
}
</script>

<template>
  <div class="tarjeta">
    <div class="avatar">
      {{ usuario.name.charAt(0) }}
    </div>

    <h3>{{ usuario.name }}</h3>

    <p class="dato">
      <span>Correo electrónico</span>
      {{ usuario.email }}
    </p>

    <p class="dato">
      <span>Ciudad</span>
      {{ usuario.address.city }}
    </p>

    <button
      class="boton-favorito"
      :class="{ activo: esFavorito }"
      @click="marcarFavorito(usuario.id)"
    >
      {{ esFavorito ? "♥ Quitar favorito" : "♡ Agregar favorito" }}
    </button>
  </div>
</template>
