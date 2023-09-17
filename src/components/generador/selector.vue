<template>
    <Select :clase="clase || ''" @change="cambiarSelección(($event.target as HTMLSelectElement).value as IdClase)">
        <option disabled value="">Clases</option>
        <option v-for="clase in $clases" :value="clase.id">
            {{ clase.nombre }} ({{ $grupos.filter(grupo => grupo.seleccionado && grupo.clase === clase.id).length }}/{{ $grupos.filter(grupo => grupo.clase === clase.id).length }})
        </option>
    </Select>
</template>

<script setup lang="ts">
    import Select from '../etiquetas/select.vue'
    import { idClaseMarcada } from '@Librería/horarios'
    import { clases, grupos } from '@Librería/clases'
    import { useStore } from '@nanostores/vue';

    const { clase } = defineProps<{ clase?: string }>()
    const $clases = useStore(clases)
    const $grupos = useStore(grupos)

    function cambiarSelección(idClase: IdClase) {
        idClaseMarcada.set(idClase)
    }
</script>