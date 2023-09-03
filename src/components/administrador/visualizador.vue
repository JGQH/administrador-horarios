<template>
    <div class="flex flex-col gap-3 absolute inset-0">
        <template v-for="(favorito, indexFavorito) in $horariosFavoritos" :key="favorito.id">
            <Agregador v-if="favorito.id === '0'" @click="agregarSeparador()">
                Agregar separador
            </Agregador>
            <div>
                <div tabindex="0" class="nombrador bg-white-dark dark:bg-black-light rounded-md p-1 md:p-2">
                    <input v-if="idSeleccionada === favorito.id" class="p-1 bg-white dark:bg-black" :value="favorito.nombre" @input="renombrarSeparador(($event.target as HTMLInputElement).value, indexFavorito)" @focusout="deseleccionar()" autofocus />
                    <H2 v-else><Editor :texto="favorito.nombre" :opciones="['editar', 'eliminar']" @editar="idSeleccionada = favorito.id" @eliminar="eliminarSeparador(indexFavorito)" /></H2>
                </div>
                <div>
                    <div v-for="(horario, indexHorario) in favorito.contenido" class="nombrador p-1 md:p-2 cursor-move" tabindex="0" draggable="true" :key="horario.id" @dragstart="empezarArrastre($event, indexHorario, indexFavorito)">
                        <Editor :texto="horario.id.split('-')[0]" :opciones="['eliminar', 'visualizar']" @eliminar="eliminarHorario(indexFavorito, indexHorario)" @visualizar="mostrarHorario(horario.cursos)" />
                    </div>
                    <div class="w-full p-1 md:p-2 italic border-2 border-dashed border-white-dark text-white-dark dark:border-black-light dark:text-black-light" @drop="terminarArrastre($event, indexFavorito)" @dragenter.prevent @dragover.prevent>
                        Mover aquí
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import H2 from '../etiquetas/h2.vue'
    import Agregador from '../etiquetas/agregador.vue'
    import Editor from '../etiquetas/editor.vue'
    import { horariosFavoritos, mostrarHorario, moverHorario, eliminarHorario, agregarSeparador, renombrarSeparador, eliminarSeparador } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue'
    import { ref } from "vue";

    const idSeleccionada = ref<string>('')

    const $horariosFavoritos = useStore(horariosFavoritos)

    function terminarArrastre(evento: DragEvent, indexFavoritoDestino: number) {
        // Confirmamos que hay un evento de Data Transfer
        if (!evento.dataTransfer) return

        const indexFavoritoOrigen = +evento.dataTransfer.getData('indexFavoritoOrigen')
        const indexHorario = +evento.dataTransfer.getData('indexHorario')
        
        moverHorario(indexHorario, indexFavoritoOrigen, indexFavoritoDestino)
    }

    function empezarArrastre(evento: DragEvent, indexHorario: number, indexFavoritoOrigen: number) {
        if (evento.dataTransfer) {
            evento.dataTransfer.dropEffect = 'move'
            evento.dataTransfer.effectAllowed = 'move'
            evento.dataTransfer.setData('indexHorario', '' + indexHorario)
            evento.dataTransfer.setData('indexFavoritoOrigen', '' + indexFavoritoOrigen)
        }
    }

    function deseleccionar() {
        idSeleccionada.value = ''
    }
</script>