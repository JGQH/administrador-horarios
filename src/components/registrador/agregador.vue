<template>
    <button class="italic flex items-center gap-2 p-2" @click="emit('click')">
        <span class="icono" v-html="agregar"></span>
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
    import agregar from "@Assets/agregar.svg?raw"

    const emit = defineEmits<{
        (e: 'click'): void
    }>()
</script>