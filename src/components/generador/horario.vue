<template>
    <Horario :bloques="$horariosGenerados[$índiceGenerador]?.flatMap(({ bloques, color }) => bloques.map(bloque => ({ color, ...bloque }))) || []" />
</template>

<script setup lang="ts">
    import Horario from '../horario/index.vue'
    import { horariosGenerados, índiceGenerador} from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)
</script>