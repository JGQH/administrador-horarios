<template>
    <button :class="clase" @click="generarHorarios()">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    import { useStore } from '@nanostores/vue';
    import { índiceGenerador, clases, horariosGenerados } from '@Librería/administrador'

    const { clase } = defineProps<{ clase?: string }>()

    const $clases = useStore(clases)

    function esVálido(horario: Curso[], nuevoCurso: Curso): Boolean {
        for(const curso of horario) {
            for(const bloque of curso.bloques) {
                for(const nuevoBloque of nuevoCurso.bloques) {
                    // No tiene caso comprobar cruce si es en días diferentes
                    if(bloque.día !== nuevoBloque.día) continue

                    // Si no se da que "bloque" empieza luego de que "nuevoBloque" termina
                    // o que "nuevoBloque" empieza luego de que "bloque" termina,
                    // entonces se intersectan, por lo que no es válido
                    if(!((bloque.inicio > nuevoBloque.final) || (nuevoBloque.inicio > bloque.final))) return false
                }
            }
        }

        return true
    }
    function generarHorarios() {
        // Solo consideramos las clases que tengan, al menos, 1 grupo seleccionado
        const clasesConsideradas = $clases.value.filter(clase => clase.grupos.filter(grupo => grupo.seleccionado).length > 0)

        if (clasesConsideradas.length === 0) { // Si no hay clases a evaluar, nos saltamos la evaluación
            horariosGenerados.set([])
            return
        }

        // Convertimos las clases consideradas a datos que se puedan usar
        const cursosConsiderados: Curso[][] = clasesConsideradas.map(clase => clase.grupos.filter(({ seleccionado }) => seleccionado)?.map(grupo => ({
            nombre: `${clase.nombre} [${grupo.nombre}]`,
            color: clase.color,
            bloques: grupo.bloques
        })) || [])

        // Los cursos considerados se vuelven en horarios válidos
        let horariosConsiderados: Curso[][] = cursosConsiderados[0].map(curso => [curso]) // Empezamos con horarios de solo 1 curso
        
        for(const cursosActuales of cursosConsiderados.slice(1)) {
            if (horariosConsiderados.length === 0) { // Los horarios anteriores se han aniquilado entre sí, así que hay cruce
                horariosGenerados.set([])
                return
            }

            const resultado: Curso[][] = []

            for(const horarioAnterior of horariosConsiderados) {
                for(const cursoActual of cursosActuales) {
                    if (esVálido(horarioAnterior, cursoActual)) {
                        resultado.push([...horarioAnterior, cursoActual])
                    }
                }
            }

            horariosConsiderados = resultado
        }

        // Reiniciamos el índice y actualizamos la lista de horarios
        índiceGenerador.set(0)
        horariosGenerados.set(horariosConsiderados)
    }
</script>