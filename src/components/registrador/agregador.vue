<template>
    <button class="icono" @click="emit('click')" v-html="agregar"></button>
</template>

<script setup lang="ts">
    import agregar from "@Assets/agregar.svg?raw"

    const emit = defineEmits<{
        (e: 'click'): void
    }>()
</script>