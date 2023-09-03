<template>
    <Select :clase="clase || ''" @change="cambiarSelección(($event.target as HTMLSelectElement).value)">
        <option disabled value="">Clases</option>
        <option v-for="clase in $clases" :value="clase.id">
            {{ clase.nombre }} ({{ clase.grupos.filter(grupo => grupo.seleccionado).length }}/{{ clase.grupos.length }})
        </option>
    </Select>
</template>

<script setup lang="ts">
    import Select from '../etiquetas/select.vue'
    import { índiceMarcador } from '@Librería/horarios'
    import { clases } from '@Librería/clases'
    import { useStore } from '@nanostores/vue';

    const { clase } = defineProps<{ clase?: string }>()
    const $clases = useStore(clases)

    function cambiarSelección(id: string) {
        const nuevoíndiceMarcador = $clases.value.findIndex(clase => clase.id === id)

        if (nuevoíndiceMarcador !== -1) {
            índiceMarcador.set(nuevoíndiceMarcador)
        }
    }
</script>