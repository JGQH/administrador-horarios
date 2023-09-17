<template>
    <Horario :bloques="$horarioGeneradoVisualizado.flatMap(({ nombre, bloques, color }) => bloques.map(bloque => ({...bloque, nombre, color})))" />
</template>

<script setup lang="ts">
    import Horario from '../horario/index.vue'
    import { horarioGeneradoVisualizado } from '@Librería/horarios'
    import { useStore } from '@nanostores/vue';

    const $horarioGeneradoVisualizado = useStore(horarioGeneradoVisualizado)
</script>