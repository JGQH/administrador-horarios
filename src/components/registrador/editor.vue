<template>
    <span v-if="texto.trim() === ''" class="italic" @dblclick="emit('selección')">(Vacío)</span>
    <span v-else @dblclick="emit('selección')">{{ texto }}</span>
    <button class="hidden" @click="emit('selección')">
        <img :src="lápiz.src" :width="lápiz.width" :height="lápiz.height" />
    </button>
    <button class="hidden" @click="emit('eliminación')">
        <img :src="basura.src" :width="basura.width" :height="basura.height" />
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

<style scoped>
  img {
    height: 1rem;
    width: 1rem;
  }
</style>