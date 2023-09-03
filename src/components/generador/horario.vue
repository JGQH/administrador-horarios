<template>
    <Horario :bloques="$horariosGenerados[$índiceGenerador]?.flatMap(({ nombre, bloques, color }) => bloques.map(bloque => ({ nombre, color, ...bloque }))) || []" />
</template>

<script setup lang="ts">
    import Horario from '../horario/index.vue'
    import { horariosGenerados, índiceGenerador} from '@Librería/horarios'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)
</script>