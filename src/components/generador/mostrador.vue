<template>
    <template v-if="!$horariosGenerados[$índiceGenerador]" class="italic">
        <p>Haga click en el botón "Generar Horarios"</p>
        <p>Si no ha registrado sus cursos, <a href="/administrador-horarios/registrar" class="text-accent underline">comience registrándolos</a></p>
    </template>
    <p v-for="curso in $horariosGenerados[$índiceGenerador]" :style="{ 
        color: curso.color
    }">{{ curso.nombre }}</p>
</template>

<script setup lang="ts">
    import { horariosGenerados, índiceGenerador } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $índiceGenerador = useStore(índiceGenerador)
</script>