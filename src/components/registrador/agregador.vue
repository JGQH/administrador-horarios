<template>
    <button @click="emit('click')">
        <img :src="agregar.src" :width="agregar.width" :height="agregar.height" />
    </button>
</template>

<script setup lang="ts">
    import agregar from "@Assets/agregar.svg"

    const emit = defineEmits<{
        (e: 'click'): void
    }>()
</script>

<style scoped>
    img {
        height: 1rem;
        width: 1rem;
    }
</style>