<template>
    <div class="grid grid-cols-6">
        <!-- Cabecera -->
        <div class="text-center">
            Horas
        </div>
        <div v-for="día in díasSemana" class="text-center">
            <div>{{ día }}</div>
        </div>
        <!-- Horas -->
        <div v-for="n in 16" class="col-start-1 text-center">
            {{ horasInicio[n - 1] }} - {{ horasFinal[n - 1] }}
        </div>
        <!-- Cuerpo -->
        <div v-for="bloque in bloques" class="border-2 border-white bg-white-dark dark:border-black dark:bg-black-light" :style="{ gridColumnStart: bloque.día + 2, gridRowStart: bloque.inicio + 2, gridRowEnd: bloque.final + 3 }" ></div>
    </div>
</template>

<script setup lang="ts">
    import { díasSemana, horasInicio, horasFinal } from "@Librería/organizador"

    const { bloques } = defineProps<{
        bloques: Bloque[]
    }>()
</script>