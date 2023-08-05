<template>
    <span>{{ texto }}</span>
    <button @click="emit('selección')">
        <img class="hidden" :src="lápiz.src" :width="lápiz.width" :height="lápiz.height" />
    </button>
    <button @click="emit('eliminación')">
        <img class="hidden" :src="basura.src" :width="basura.width" :height="basura.height" />
    </button>
</template>

<script setup lang="ts">
    import lápiz from "@Assets/lápiz.svg"
    import basura from "@Assets/basura.svg"

    const { texto } = defineProps<{
        texto: string
    }>()

    const emit = defineEmits<{
        (e: 'selección'): void
        (e: 'eliminación'): void
    }>()
</script>