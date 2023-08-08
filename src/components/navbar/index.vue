<template>
    <nav>
        <h1>Creador de horarios</h1>
        <div v-for="ruta in rutas">
            <a :href="ruta === 'Generar' ? '/' : ruta.toLowerCase()">{{ ruta }}</a>
        </div>
    </nav>
</template>

<script setup lang="ts">
    const rutas: string[] = ["Generar", "Registrar", "Visualizar"]
</script>