<template>
    <div :class="clase" v-for="grupo in ($clases[$índiceMarcador]?.grupos || [])" :key="grupo.id">
        <p class="font-bold">{{ grupo.nombre }}</p>
        <button @click="accionarGrupo(grupo.id)" :class="`block border-2 border-accent w-[1rem] h-[1rem] rounded-sm ${grupo.seleccionado ? 'bg-accent' : '' }`"></button>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from '@nanostores/vue';
    import { índiceMarcador } from '@Librería/horarios'
    import { clases } from '@Librería/clases'

    const { clase } = defineProps<{ clase: string }>()

    const $índiceMarcador = useStore(índiceMarcador)
    const $clases = useStore(clases)

    function accionarGrupo(id: string) {
        const objeto = $clases.value.flatMap((clase, índiceClase) => 
                            clase.grupos.map((grupo, índiceGrupo) => ({
                                índiceClase,
                                índiceGrupo,
                                id: grupo.id
                            })
                        )).find(obj => obj.id === id)
        
        if  (objeto) {
            const nuevasClases = [...clases.get()]
            
            nuevasClases[objeto.índiceClase].grupos[objeto.índiceGrupo].seleccionado = !nuevasClases[objeto.índiceClase].grupos[objeto.índiceGrupo].seleccionado

            clases.set(nuevasClases)
        }
    }
</script>