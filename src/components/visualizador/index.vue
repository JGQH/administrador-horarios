<template>
    <Select class="py-3 mb-3 md:mb-5" @change="cambiarBloques(($event.target as HTMLSelectElement).value)">
        <option disabled value="">Clase</option>
        <template v-for="clase in clases">
            <option v-for="grupo in clase.grupos" :value="grupo.id">{{ clase.nombre }} - {{ grupo.nombre }}</option>
        </template>
    </Select>
    <div class="w-full overflow-x-auto">
        <Horario :bloques="bloques" />
    </div>
</template>

<script setup lang="ts">
    import Select from '../etiquetas/select.vue'
    import Horario from '../horario/index.vue'
    import usarLocalStorage from '@Librería/usarLocalStorage';
    import { ref } from 'vue';

    const clases = usarLocalStorage<Clase[]>('clases', [])

    const bloques = ref<BloqueVisual[]>(clases.value ? clases.value[0]?.grupos[0]?.bloques || [] : [])

    function cambiarBloques(idGrupo:String) {
        const objeto = clases.value.flatMap(({ grupos }, índiceClase) => (
            grupos.map(({ id }, índiceGrupo) => ({
                id, índiceClase, índiceGrupo
            }))
        )).find(obj => obj.id === idGrupo)

        if (objeto) {
            bloques.value = clases.value[objeto.índiceClase].grupos[objeto.índiceGrupo].bloques
        }
    }
</script>