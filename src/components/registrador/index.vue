<template>
    <div class="absolute w-full">
        <div v-if="clases?.length === 0">
            <p class="italic pl-2 pt-2">Comience agregando sus clases dando click al botón "Agregar clase"</p>
        </div>
        <div v-else v-for="clase in clases" :style="{ backgroundColor: clase.color }" class="p-2">
            <div v-if="idSeleccionada===clase.id">
                <input class="font-bold rounded-md p-2 bg-white dark:bg-black" v-model="clase.nombre" @focusout="deseleccionar()" autofocus />
            </div>
            <div tabindex="0" class="nombrador flex flex-row font-bold p-2" v-else>
                <Editor :texto="clase.nombre" @selección="seleccionar(clase.id, clase.nombre)" @eliminación="eliminarClase(clase.id)" />
                <button class="hidden">
                    <label class="cursor-pointer">
                        <div class="[&_svg]:h-[0.9rem] [&_svg]:w-[1rem]" v-html="paleta"></div>
                        <input class="hidden" type="color" :value="clase.color" @change="cambiarColor(clase.id, ($event.target as HTMLInputElement).value)" />
                    </label>
                </button>
            </div>
            <div class="pl-5">
                <div v-for="grupo in clase.grupos">
                    <div v-if="idSeleccionada===grupo.id">
                        <input class="font-bold rounded-md p-2 bg-white dark:bg-black" v-model="grupo.nombre" @focusout="deseleccionar()" autofocus />
                    </div>
                    <div tabindex="0" class="nombrador font-bold p-2" v-else>
                        <Editor :texto="grupo.nombre" @selección="seleccionar(grupo.id, grupo.nombre)" @eliminación="eliminarGrupo(grupo.id)" />
                    </div>
                    <div class="pl-8">
                        <div v-for="bloque in grupo.bloques">
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
                                <button class="font-bold bg-black text-white rounded-md p-2 dark:bg-white dark:text-black" @click="reprogramarBloque(bloque.id)">
                                    Aceptar
                                </button>
                            </div>
                            <div tabindex="0" class="nombrador pl-2" v-else>
                                <Editor :texto="formatoBloque(bloque)" @selección="seleccionar(bloque.id, JSON.stringify(bloque))" @eliminación="eliminarBloque(bloque.id)" />
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
    import paleta from '@Assets/paleta.svg?raw'
    import {  díasSemana, horasInicio, horasFinal} from '@Librería/organizador'
    import usarLocalStorage from '@Librería/usarLocalStorage';
    import Select from '../etiquetas/select.vue'
    import Editor from './editor.vue'
    import Agregador from './agregador.vue'
    import { v4 as uuid} from 'uuid'
    import { ref } from "vue";

    const idSeleccionada = ref<string>('')
    const nombreNuevo = ref<string>('')
    
    const clases = usarLocalStorage<Clase[]>("clases", [])

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

    function cambiarColor(id: string, color:string) {
        const índiceClase = clases.value.findIndex(clase => clase.id === id)

        clases.value[índiceClase].color = color
    }

    function deseleccionar() {
        idSeleccionada.value = ''
    }
    
    // Duración de los cursos
    function duraciónBloque(bloque: Bloque): number {
        return bloque.final - bloque.inicio + 1
    }

    // Agregar cursos
    function agregarBloque(id: string) {
        // Aplanamos los datos para encontrar el grupo a modificar
        const objeto = clases.value.flatMap((clase, índiceClase) => 
                            clase.grupos.map((grupo, índiceGrupo) => ({
                                índiceClase,
                                índiceGrupo,
                                id: grupo.id
                            })
                        )).find(obj => obj.id === id)

        if (objeto) {
            const bloque: Bloque = { día: 0, inicio: 0, final: 1, id: uuid() }
            clases.value[objeto.índiceClase].grupos[objeto.índiceGrupo].bloques.push(bloque)
        }
    }

    function agregarGrupo(id: string) {
        const índiceClase = clases.value.findIndex(clase => clase.id === id)

        // Sabemos que esta función se llama de manera válida, así que no saltamos la comprobación
        clases.value[índiceClase].grupos.push({ nombre: "", bloques: [], id: uuid() })
    }

    function agregarClase() {
        clases.value.push({ nombre: "", color: "#FFAAAA", id: uuid(), grupos: [] })
    }

    // Eliminar cursos
    function eliminarBloque(id: string) {
        // Aplanamos los datos para encontrar el grupo a modificar
        const objeto = clases.value.flatMap((clase, índiceClase) => 
                            clase.grupos.flatMap((grupo, índiceGrupo) => 
                                grupo.bloques.map((bloque, índiceBloque) => ({
                                    índiceClase,
                                    índiceGrupo,
                                    índiceBloque,
                                    id: bloque.id
                                }))
                            )
                        ).find(obj => obj.id === id)
        
        if(objeto) {
            clases.value[objeto.índiceClase].grupos[objeto.índiceGrupo].bloques.splice(objeto.índiceBloque, 1)
        }
    }

    function eliminarGrupo(id: string){
        const objeto = clases.value.flatMap((clase, índiceClase) => 
                            clase.grupos.map((grupo, índiceGrupo) => ({
                                índiceClase,
                                índiceGrupo,
                                id: grupo.id
                            })
                        )).find(obj => obj.id === id)

        if (objeto) {
            clases.value[objeto.índiceClase].grupos.splice(objeto.índiceGrupo, 1)
        }
    }

    function eliminarClase(id: string) {
        const índiceClase = clases.value.findIndex(clase => clase.id === id)

        clases.value.splice(índiceClase, 1)
    }

    // Renombrar cursos
    function reprogramarBloque(id:string) {
        // Aplanamos los datos para obtener los índices de la clase, del grupo y del bloque de 1 sola vez
        const objeto = clases.value.flatMap((clase, índiceClase) => 
                            clase.grupos.flatMap((grupo, índiceGrupo) => 
                                grupo.bloques.map((bloque, índiceBloque) => ({
                                    índiceClase,
                                    índiceGrupo,
                                    índiceBloque,
                                    id: bloque.id
                                }))
                            )
                        ).find(obj => obj.id === id)
        
        if (objeto) {
            const bloque = JSON.parse(nombreNuevo.value) as Bloque
            clases.value[objeto.índiceClase].grupos[objeto.índiceGrupo].bloques[objeto.índiceBloque] = bloque
            idSeleccionada.value = ''
        }
    }
</script>

<style>
    :is(.nombrador:hover, .nombrador:focus-within) button {
        display: inline-block;
    }
</style>
