<template>
    <Button @click="señalarFavorito()" :disabled="$horariosGenerados.length===0">
        <slot></slot>
    </Button>
</template>

<script setup lang="ts">
    import { default as Button } from '../etiquetas/button.vue'
    import { horariosGenerados, índiceGenerador } from '@Librería/horarios'
    import { agregarHorario} from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)

    function señalarFavorito() {
        const horarioActual = $horariosGenerados.value[$índiceGenerador.value]

        if (horarioActual) {
            agregarHorario(horarioActual)
        }
    }
</script>