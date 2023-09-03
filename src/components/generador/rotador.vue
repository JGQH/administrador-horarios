<template>
    <button @click="rotarÍndice('anterior')" class="[&_svg]:h-[1rem] [&_svg]:w-[1rem] [&:disabled_svg]:stroke-1" :disabled="$horariosGenerados.length <= 1" v-html="flechaIzquierda"></button>
    <p class="font-bold" v-if="$horariosGenerados.length > 0">{{ $índiceGenerador + 1 }} / {{ $horariosGenerados.length }}</p>
    <p v-else>0 / 0</p>
    <button @click="rotarÍndice('siguiente')" class="[&_svg]:h-[1rem] [&_svg]:w-[1rem] [&:disabled_svg]:stroke-1" :disabled="$horariosGenerados.length <= 1" v-html="flechaDerecha"></button>
</template>

<script setup lang="ts">
    import flechaIzquierda from '@Assets/flecha-izquierda.svg?raw'
    import flechaDerecha from '@Assets/flecha-derecha.svg?raw'
    import { horariosGenerados, índiceGenerador, rotarÍndice } from '@Librería/horarios'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)
</script>