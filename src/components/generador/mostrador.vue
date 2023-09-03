<template>
    <template v-if="!$horariosGenerados[$indexGenerador]" class="italic">
        <p>Haga click en el botón "Generar Horarios"</p>
        <p>Si no ha registrado sus cursos, <a href="/administrador-horarios/registrar" class="text-accent underline">comience registrándolos</a></p>
    </template>
    <ul v-else class="w-fit">
        <li class="px-3 py-1 mb-1 rounded-md" v-for="curso in $horariosGenerados[$indexGenerador]" :style="{ 
            backgroundColor: curso.color
        }">{{ curso.nombre }}</li>
    </ul>
</template>

<script setup lang="ts">
    import { horariosGenerados, índiceGenerador } from '@Librería/horarios'
    import { useStore } from '@nanostores/vue';

    const $horariosGenerados = useStore(horariosGenerados)
    const $indexGenerador = useStore(índiceGenerador)
</script>