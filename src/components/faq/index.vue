<template>
    <div v-for="pregunta in preguntas" class="bg-white-dark dark:bg-black-light p-3 md:p-5 rounded-md">
        <H2 class="mb-3">{{ pregunta.orden }}. {{ pregunta.pregunta }}</H2>
        <div class="[&_p:not(:last-child)]:mb-3" v-html="pregunta.html" />
    </div>
</template>

<script setup lang="ts">
    import H2 from '../etiquetas/h2.vue'

    const { preguntas } = defineProps<{ preguntas: Array<Pregunta & { html: string }> }>()
</script>