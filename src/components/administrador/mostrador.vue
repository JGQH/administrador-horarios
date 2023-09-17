<template>
    <template v-if="$horarioFavoritoVisualizado.length === 0" class="italic">
        <p>Haga click en el botón "Visualizar" (Con forma de ojo) de alguno de sus horarios favoritos</p>
        <p>Si no ha seleccionado sus horarios favoritos, <a href="/administrador-horarios/" class="text-accent underline">comience generándolos</a></p>
    </template>
    <ul v-else class="w-fit">
        <li class="px-3 py-1 mb-1 rounded-md" v-for="curso in $horarioFavoritoVisualizado" :style="{ 
            backgroundColor: curso.color
        }">{{ curso.nombre }}</li>
    </ul>
</template>

<script setup lang="ts">
    import { horarioFavoritoVisualizado } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue';
    
    const $horarioFavoritoVisualizado = useStore(horarioFavoritoVisualizado)
</script>