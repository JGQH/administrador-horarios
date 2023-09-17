<template>
    <Button @click="tomarCaptura">
        <slot />
    </Button>
</template>

<script setup lang="ts">
    import Button from '../etiquetas/button.vue'
    import { toPng } from 'html-to-image';

    async function tomarCaptura() {
        const horario = document.getElementById('horario')

        if (horario) {
            const imagen = await toPng(horario)

            const a = document.createElement('a')
            a.download = 'horario.png'
            a.href = imagen

            a.click()
        }
    }
</script>