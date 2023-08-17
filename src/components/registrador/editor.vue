<template>
    <div class="flex flex-row items-center">
    <span v-if="texto.trim() === ''" class="italic" @dblclick="emit('selección')">(Vacío)</span>
    <span v-else @dblclick="emit('selección')" class="pr-2">{{ texto }}</span>
    <button class="hidden [&_svg]:h-[0.9rem] [&_svg]:w-[1rem]" @click="emit('selección')" v-html="lápiz"></button>
    <button class="hidden [&_svg]:h-[0.9rem] [&_svg]:w-[1rem]" @click="emit('eliminación')" v-html="basura"></button>
    </div>
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