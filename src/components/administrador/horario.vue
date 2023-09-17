<template>
    <Horario :bloques="$horarioFavoritoVisualizado.flatMap(({ nombre, bloques, color }) => bloques.map(bloque => ({...bloque, nombre, color})))" />
</template>

<script setup lang="ts">
    import Horario from '../horario/index.vue'
    import { horarioFavoritoVisualizado } from '@Librería/administrador';
    import { useStore } from '@nanostores/vue';

    const $horarioFavoritoVisualizado = useStore(horarioFavoritoVisualizado)
</script>