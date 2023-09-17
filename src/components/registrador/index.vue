<template>
    <div class="absolute w-full">
        <div v-if="$clases?.length === 0">
            <p class="italic pl-2 pt-2">Comience agregando sus clases dando click al botón "Agregar clase"</p>
        </div>
        <div v-else v-for="clase in $clases" :style="{ backgroundColor: clase.color }" class="p-2">
            <div v-if="idSeleccionada===clase.id">
                <input class="font-bold rounded-md p-2 bg-white dark:bg-black"
                    :value="clase.nombre"
                    @input="renombrarClase(clase.id, ($event.target as HTMLInputElement).value)"
                    @focusout="deseleccionar()"
                    autofocus />
            </div>
            <div tabindex="0" class="nombrador flex flex-row font-bold p-2" v-else>
                <Editor
                    :texto="clase.nombre"
                    :color="clase.color"
                    :opciones="['editar', 'eliminar', 'pintar']"
                    @editar="seleccionar(clase.id, clase.nombre)"
                    @eliminar="eliminarClase(clase.id)"
                    @pintar="cambiarColor(clase.id, $event)" />
            </div>
            <div class="pl-5">
                <div v-for="grupo in $grupos.filter(g => g.clase === clase.id)">
                    <div v-if="idSeleccionada===grupo.id">
                        <input class="font-bold rounded-md p-2 bg-white dark:bg-black"
                            :value="grupo.nombre"
                            @input="renombrarGrupo(grupo.id, ($event.target as HTMLInputElement).value)"
                            @focusout="deseleccionar()"
                            autofocus />
                    </div>
                    <div tabindex="0" class="nombrador font-bold p-2" v-else>
                        <Editor
                            :texto="grupo.nombre"
                            :opciones="['editar', 'eliminar']"
                            @editar="seleccionar(grupo.id, grupo.nombre)"
                            @eliminar="eliminarGrupo(grupo.id)" />
                    </div>
                    <div class="pl-8">
                        <div v-for="bloque in $bloques.filter(b => b.grupo === grupo.id)">
                            <div v-if="idSeleccionada===bloque.id">
                                <Select class="inline p-2" @change="reformarBloque('día', +($event.target as HTMLSelectElement).value)">
                                    <option disabled value="">Día</option>
                                    <option v-for="(día, índiceDía) in díasSemana" :value="índiceDía" :selected="índiceDía===bloque.día">{{ día }}</option>
                                </Select>,
                                <Select class="inline p-2" @change="reformarBloque('inicio', +($event.target as HTMLSelectElement).value)">
                                    <option disabled value="">Inicio</option>
                                    <option v-for="(inicio, índiceInicio) in horasInicio" :value="índiceInicio" :selected="índiceInicio===bloque.inicio">{{ inicio }}</option>
                                </Select> -
                                <Select class="inline p-2" @change="reformarBloque('final', +($event.target as HTMLSelectElement).value)">
                                    <option disabled value="">Final</option>
                                    <option v-for="(final, índiceFinal) in horasFinal" :value="índiceFinal" :selected="índiceFinal===bloque.final">{{ final }}</option>
                                </Select> | 
                                <button class="font-bold bg-black text-white rounded-md p-2 dark:bg-white dark:text-black" @click="reprogramarBloque(bloque.id, JSON.parse(nombreNuevo) as Omit<Bloque, 'id'>); deseleccionar()">
                                    Aceptar
                                </button>
                            </div>
                            <div tabindex="0" class="nombrador pl-2" v-else>
                                <Editor
                                    :texto="formatoBloque(bloque)"
                                    :opciones="['editar', 'eliminar']"
                                    @editar="seleccionar(bloque.id, JSON.stringify(bloque))"
                                    @eliminar="eliminarBloque(bloque.id)" />
                            </div>
                        </div>
                        <Agregador @click="agregarBloque(grupo.id)">Agregar bloque</Agregador>
                    </div>
                </div>
                <Agregador @click="agregarGrupo(clase.id)">Agregar grupo</Agregador>
            </div>
        </div>
        <Agregador @click="agregarClase()">Agregar clase</Agregador>
    </div>
</template>

<script setup lang="ts">
    import { díasSemana, horasInicio, horasFinal} from '@Librería/organizador'
    import { clases, grupos, bloques, cambiarColor, agregarClase, agregarGrupo, agregarBloque, eliminarClase, eliminarGrupo, eliminarBloque, renombrarClase, renombrarGrupo, reprogramarBloque } from '@Librería/clases'
    import Select from '../etiquetas/select.vue'
    import Editor from '../etiquetas/editor.vue'
    import Agregador from '../etiquetas/agregador.vue'
    import { ref } from "vue";
    import { useStore } from '@nanostores/vue';

    const idSeleccionada = ref<string>('')
    const nombreNuevo = ref<string>('')
    
    const $clases = useStore(clases)
    const $grupos = useStore(grupos)
    const $bloques = useStore(bloques)

    // Utilidades
    function seleccionar(id: string, nombre: string) {
        idSeleccionada.value = id
        nombreNuevo.value = nombre
    }

    function formatoBloque(bloque: Bloque): string {
        return `${díasSemana[bloque.día]}, ${horasInicio[bloque.inicio]} - ${horasFinal[bloque.final]} (${duraciónBloque(bloque)} horas)`
    }

    function reformarBloque<T extends keyof Bloque>(propiedad: T, nuevoValor: Bloque[T]) {
        const bloque = JSON.parse(nombreNuevo.value) as Bloque
        bloque[propiedad] = nuevoValor

        nombreNuevo.value = JSON.stringify(bloque)
    }

    function deseleccionar() {
        idSeleccionada.value = ''
    }
    
    // Duración de los cursos
    function duraciónBloque(bloque: Bloque): number {
        return bloque.final - bloque.inicio + 1
    }
</script>

<style>
    :is(.nombrador:hover, .nombrador:focus-within) button {
        display: inline-block;
    }
</style>
