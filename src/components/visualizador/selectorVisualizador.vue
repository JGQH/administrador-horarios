<template>
    <Select :clase="clase" @change="cambiarBloques(($event.target as HTMLSelectElement).value)">
        <option disabled value="">Clase</option>
        <template v-for="clase in $clases">
            <option v-for="grupo in clase.grupos" :value="grupo.id">{{ clase.nombre }} - {{ grupo.nombre }}</option>
        </template>
    </Select>
</template>

<script setup lang="ts">
    const { clase } = defineProps<{ clase?: string }>()

    import Select from '../etiquetas/select.vue'
    import { bloquesVisualizados, clases } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue'

    const $clases = useStore(clases)

    function cambiarBloques(idGrupo:string) {
        const objeto = $clases.value.flatMap(({ grupos }, índiceClase) => (
            grupos.map(({ id }, índiceGrupo) => ({
                id, índiceClase, índiceGrupo
            }))
        )).find(obj => obj.id === idGrupo)

        if (objeto) {
            bloquesVisualizados.set($clases.value[objeto.índiceClase].grupos[objeto.índiceGrupo].bloques)
        }
    }
</script>