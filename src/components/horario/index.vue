<template>
    <div class="grid grid-cols-6 min-w-[640px]">
        <!-- Cabecera -->
        <div class="text-center bg-white-dark dark:bg-black-light">
            <p class="font-bold">Horas</p>
        </div>
        <div v-for="día in díasSemana" class="text-center bg-white-dark dark:bg-black-light">
            <p class="font-bold">{{ día }}</p>
        </div>
        <!-- Horas -->
        <div v-for="n in 16" class="col-start-1 text-center text-xs md:text-sm">
            <p>{{ horasInicio[n - 1] }} - {{ horasFinal[n - 1] }}</p>
        </div>
        <!-- Cuerpo -->
        <div v-for="bloque in bloques" :class="`border-2 border-white dark:border-black ${!bloque.color && 'bg-white-dark dark:bg-black-light'}`" :style="{ gridColumnStart: bloque.día + 2, gridRowStart: bloque.inicio + 2, gridRowEnd: bloque.final + 3, backgroundColor: bloque.color}">
            <p v-if="bloque.nombre" class="text-center p-[1px]">{{ bloque.nombre }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { díasSemana, horasInicio, horasFinal } from "@Librería/organizador"

    const { bloques = [] } = defineProps<{
        bloques?: readonly BloqueVisual[]
    }>()
</script>