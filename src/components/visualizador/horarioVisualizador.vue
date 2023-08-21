<template>
    <Horario :bloques="$bloquesVisualizados" />
</template>

<script setup lang="ts">
    import Horario from '../horario/index.vue'
    import { bloquesVisualizados } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';

    const $bloquesVisualizados = useStore(bloquesVisualizados)
</script>