<template>
    <div class="flex flex-col gap-3 absolute inset-0">
        <template v-for="separador in $separadores" :key="separador.id">
            <Agregador v-if="separador.id === 'ids:0'" @click="agregarSeparador()">
                Agregar separador
            </Agregador>
            <div>
                <div tabindex="0" class="nombrador bg-white-dark dark:bg-black-light rounded-md p-1 md:p-2">
                    <input v-if="idSeleccionada === separador.id" class="p-1 bg-white dark:bg-black" :value="separador.nombre" @input="renombrarSeparador(($event.target as HTMLInputElement).value, separador.id)" @focusout="deseleccionar()" autofocus />
                    <H2 v-else><Editor :texto="separador.nombre" :opciones="['editar', 'eliminar']" @editar="idSeleccionada = separador.id" @eliminar="eliminarSeparador(separador.id)" /></H2>
                </div>
                <div>
                    <div v-for="horario in $horariosFavoritos.filter(h => h.separador === separador.id)" class="nombrador p-1 md:p-2 cursor-move" tabindex="0" draggable="true" :key="horario.id" @dragstart="empezarArrastre($event, horario.id)">
                        <Editor :texto="horario.id.split(/(:|-)/)[2]" :opciones="['eliminar', 'visualizar']" @eliminar="eliminarHorario(horario.id)" @visualizar="mostrarHorario(horario.id)" />
                    </div>
                    <div class="w-full p-1 md:p-2 italic border-2 border-dashed border-white-dark text-white-dark dark:border-black-light dark:text-black-light" @drop="terminarArrastre($event, separador.id)" @dragenter.prevent @dragover.prevent>
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
    import { separadores, horariosFavoritos, mostrarHorario, moverHorario, eliminarHorario, agregarSeparador, renombrarSeparador, eliminarSeparador } from '@Librería/administrador'
    import { useStore } from '@nanostores/vue'
    import { ref } from "vue";

    const idSeleccionada = ref<string>('')

    const $separadores = useStore(separadores)
    const $horariosFavoritos = useStore(horariosFavoritos)

    function terminarArrastre(evento: DragEvent, idSeparadorDestino: IdSeparador) {
        // Confirmamos que hay un evento de Data Transfer
        if (!evento.dataTransfer) return

        const idHorarioFavorito = evento.dataTransfer.getData('idHorarioFavorito') as IdHorarioFavorito
        
        moverHorario(idHorarioFavorito, idSeparadorDestino)
    }

    function empezarArrastre(evento: DragEvent, idHorarioFavorito: IdHorarioFavorito) {
        if (!evento.dataTransfer) return

        evento.dataTransfer.dropEffect = 'move'
        evento.dataTransfer.effectAllowed = 'move'
        evento.dataTransfer.setData('idHorarioFavorito', idHorarioFavorito)
    }

    function deseleccionar() {
        idSeleccionada.value = ''
    }
</script>