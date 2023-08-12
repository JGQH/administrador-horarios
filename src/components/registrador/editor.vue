<template>
    <span v-if="texto.trim() === ''" class="italic" @dblclick="emit('selección')">(Vacío)</span>
    <span v-else @dblclick="emit('selección')">{{ texto }}</span>
    <button class="hidden icono" @click="emit('selección')" v-html="lápiz"></button>
    <button class="hidden icono" @click="emit('eliminación')" v-html="basura"></button>
</template>

<script setup lang="ts">
    import lápiz from "@Assets/lápiz.svg?raw"
    import basura from "@Assets/basura.svg?raw"

    const { texto } = defineProps<{
        texto: string
    }>()
    
    const emit = defineEmits<{
        (e: 'selección'): void
        (e: 'eliminación'): void
    }>()
</script>

<style is:inline>
    .icono svg {
        height: 1rem;
        width: 1rem;
    }
</style>