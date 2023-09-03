<template>
    <Button @click="generarHorarios()">
        <slot></slot>
    </Button>
</template>

<script setup lang="ts">
    import Button from '../etiquetas/button.vue'
    import { generarHorarios } from '@Librería/horarios'
</script>