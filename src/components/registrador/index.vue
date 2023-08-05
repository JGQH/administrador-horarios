<template>
    <div>
        <div v-for="clase in clases">
            <div v-if="idSeleccionada===clase.id">
                <input class="border border-blue" v-model="nombreNuevo" @focusout="renombrarClase(clase.id)" />
            </div>
            <div class="nombrador" v-else>
                <Editor :texto="clase.nombre" @selección="seleccionar(clase.id, clase.nombre)" @eliminación="eliminarClase(clase.id)" />
            </div>
            <div class="pl-5">
                <div v-for="grupo in clase.grupos">
                    <div v-if="idSeleccionada===grupo.id">
                        <input class="border border-blue" v-model="nombreNuevo" @focusout="renombrarGrupo(grupo.id)" />
                    </div>
                    <div class="nombrador" v-else>
                        <Editor :texto="`${grupo.nombre} (${duraciónGrupo(grupo)} horas)`" @selección="seleccionar(grupo.id, grupo.nombre)" @eliminación="eliminarGrupo(grupo.id)" />
                    </div>
                    <div class="pl-5">
                        <div v-for="bloque in grupo.bloques">
                            <div class="nombrador" v-if="idSeleccionada!==bloque.id">
                                <Editor :texto="`${bloque.día}: ${bloque.inicio} - ${bloque.final} (${duraciónBloque(bloque)} horas)`" @eliminación="eliminarBloque(bloque.id)" />
                            </div>
                        </div>
                        <Agregador @click="agregarBloque(grupo.id)" />
                    </div>
                </div>
                <Agregador @click="agregarGrupo(clase.id)" />
            </div>
        </div>
        <Agregador @click="agregarClase()" />
    </div>
</template>

<script setup lang="ts">
    import usarLocalStorage from '@Librería/usarLocalStorage';
    import { default as Editor } from './editor.vue'
    import { default as Agregador } from './agregador.vue'
    import { v4 as uuid} from 'uuid'
    import { ref } from "vue";

    const idSeleccionada = ref<string>('')
    const nombreNuevo = ref<string>('')
    
    const clases = usarLocalStorage<Clase[]>("clases", [])

    // Duración de los cursos
    function duraciónBloque(bloque: Bloque): number {
        return bloque.final - bloque.inicio + 1
    }

    function duraciónGrupo(grupo: Grupo): number {
        return grupo.bloques.map(duraciónBloque).reduce((a, b) => a + b, 0)
    }

    function seleccionar(id: string, nombre: string) {
        idSeleccionada.value = id
        nombreNuevo.value = nombre
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
        clases.value[índiceClase].grupos.push({ nombre: uuid(), bloques: [], id: uuid() })
    }

    function agregarClase() {
        clases.value.push({ nombre: uuid(), id: uuid(), grupos: [] })
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
    function renombrarClase(id: string) {
        const índiceClase = clases.value.findIndex(clase => clase.id === id)

        // Solo se llama a la función con parámetros que sabemos están en el arreglo
        // Así que nos saltamos la comprobación de si "clase === 1" o no
        clases.value[índiceClase].nombre = nombreNuevo.value
        idSeleccionada.value = ''
    }

    function renombrarGrupo(id: string) {
        // Aplanamos los datos para obtener tanto el índice de la clase como el del grupo de 1 sola vez
        const objeto = clases.value.flatMap((clase, índiceClase) => 
                            clase.grupos.map((grupo, índiceGrupo) => ({
                                índiceClase,
                                índiceGrupo,
                                id: grupo.id
                            })
                        )).find(obj => obj.id === id)

        if(objeto) { // Esto es solo para complacer a TypeScript ya que sabemos que debe existir
            clases.value[objeto.índiceClase].grupos[objeto.índiceGrupo].nombre = nombreNuevo.value
            idSeleccionada.value = ''
        }
    }

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
    .nombrador:hover img {
        display: inline-block;
    }
</style>
