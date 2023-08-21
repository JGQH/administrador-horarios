<template>
    <button @click="rotarAnterior" class="[&_svg]:h-[1rem] [&_svg]:w-[1rem] [&:disabled_svg]:stroke-1" :disabled="$horariosGenerados.length <= 1" v-html="flechaIzquierda"></button>
    <p class="font-bold" v-if="$horariosGenerados.length > 0">{{ $índiceGenerador + 1 }} / {{ $horariosGenerados.length }}</p>
    <p class="font-bold" v-else>0 / 0</p>
    <button @click="rotarSiguiente" class="[&_svg]:h-[1rem] [&_svg]:w-[1rem] [&:disabled_svg]:stroke-1" :disabled="$horariosGenerados.length <= 1" v-html="flechaDerecha"></button>
</template>

<script setup lang="ts">
    import flechaIzquierda from '@Assets/flecha-izquierda.svg?raw'
    import flechaDerecha from '@Assets/flecha-derecha.svg?raw'
    import { horariosGenerados, índiceGenerador } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)

    function rotarAnterior() {
        if($índiceGenerador.value === 0) {
            índiceGenerador.set($horariosGenerados.value.length - 1)
        } else {
            índiceGenerador.set($índiceGenerador.value - 1)
        }
    }

    function rotarSiguiente() {
        if($índiceGenerador.value === $horariosGenerados.value.length - 1) {
            índiceGenerador.set(0)
        } else {
            índiceGenerador.set($índiceGenerador.value + 1)
        }
    }
</script>