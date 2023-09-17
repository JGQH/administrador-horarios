<template>
    <template v-if="$horarioGeneradoVisualizado.length === 0" class="italic">
        <p>Haga click en el botón "Generar Horarios"</p>
        <p>Si no ha registrado sus cursos, <a href="/administrador-horarios/registrar" class="text-accent underline">comience registrándolos</a></p>
    </template>
    <ul v-else class="w-fit">
        <li class="px-3 py-1 mb-1 rounded-md" v-for="curso in $horarioGeneradoVisualizado" :style="{ 
            backgroundColor: curso.color
        }">{{ curso.nombre }}</li>
    </ul>
</template>

<script setup lang="ts">
    import { horarioGeneradoVisualizado } from '@Librería/horarios'
    import { useStore } from '@nanostores/vue';
    
    const $horarioGeneradoVisualizado = useStore(horarioGeneradoVisualizado)
</script>