<template>
    <div :class="clase" v-if="$idClaseMarcada" v-for="grupo in $grupos.filter(g => g.clase === $idClaseMarcada)" :key="grupo.id">
        <p class="font-bold">{{ grupo.nombre }}</p>
        <button @click="accionarGrupo(grupo.id)" :class="`block border-2 border-accent w-[1rem] h-[1rem] rounded-sm ${grupo.seleccionado ? 'bg-accent' : '' }`"></button>
    </div>
</template>

<script setup lang="ts">
    import { useStore, useVModel } from '@nanostores/vue';
    import { idClaseMarcada } from '@Librería/horarios'
    import { grupos, accionarGrupo } from '@Librería/clases'
    import type { WritableAtom } from 'nanostores';

    const { clase } = defineProps<{ clase: string }>()

    const $idClaseMarcada = useStore(idClaseMarcada)
    const $grupos = useVModel<WritableAtom<Grupo[]>, Grupo[]>(grupos)
</script>