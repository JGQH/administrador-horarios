<template>
    <div class="flex flex-row items-center">
        <span v-if="texto.trim() === ''" class="italic" @dblclick="emit('editar')">(Vacío)</span>
        <span v-else @dblclick="emit('editar')" class="pr-2">{{ texto }}</span>
        <div class="relative">
            <div class="flex flex-row gap-1 absolute -translate-y-1/2">
                <button v-for="opcion in opciones.filter(op => op !== 'pintar') as Exclude<Emits, 'pintar'>[]"
                    class="hidden [&_svg]:h-[1.25rem] [&_svg]:w-[1.25rem]"
                    @click="emit(opcion)" v-html="htmls[opcion]"></button>
                <button v-if="opciones.includes('pintar')" class="hidden">
                    <label class="cursor-pointer">
                        <div class="[&_svg]:h-[1.25rem] [&_svg]:w-[1.25rem]" v-html="paleta"></div>
                        <input class="hidden" type="color" :value="color" @change="emit('pintar', ($event.target as HTMLInputElement).value)" />
                    </label>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import lápiz from "@Assets/lápiz.svg?raw"
    import basura from "@Assets/basura.svg?raw"
    import paleta from '@Assets/paleta.svg?raw'
    import ojo from '@Assets/ojo.svg?raw'

    type Emits = 'editar' | 'eliminar' | 'visualizar' | 'pintar'

    const htmls:Record<Emits, string> = {
        editar: lápiz,
        eliminar: basura,
        pintar: paleta,
        visualizar: ojo
    }

    const { texto, opciones, color = '#000' } = defineProps<{
        texto: string,
        opciones: Emits[],
        color?: string
    }>()
    
    const emit = defineEmits<{
        (e: Exclude<Emits, 'pintar'>): void,
        (e: 'pintar', valor: string): void 
    }>()
</script>

<style is:inline>
    .icono svg {
        height: 1rem;
        width: 1rem;
    }
</style>