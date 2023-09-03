<template>
    <Button @click="señalarFavorito()" :disabled="$horariosGenerados.length===0">
        <slot></slot>
    </Button>
</template>

<script setup lang="ts">
    import { v4 as uuid } from 'uuid'
    import { default as Button } from '../etiquetas/button.vue'
    import { horariosGenerados, índiceGenerador } from '@Librería/horarios'
    import { horariosFavoritos } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)

    function señalarFavorito() {
        const horarioActual = $horariosGenerados.value[$índiceGenerador.value] || []

        const nuevosHorariosFavoritos = horariosFavoritos.get().map(favorito => {
            if(favorito.id !== '0') return favorito

            // Favorito con ID de '0' es 'Sin agrupación'
            favorito.contenido.push({ nombre: '', id: uuid(), cursos: horarioActual })

            return favorito
        })

        horariosFavoritos.set(nuevosHorariosFavoritos)
    }
</script>