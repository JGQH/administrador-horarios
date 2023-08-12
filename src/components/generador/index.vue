<template>
    <div v-if="clases?.length === 0">
        <p>No hay horarios disponibles</p>
        <p><a href="/registrar" class="italic">Comience registrando sus cursos</a></p>
    </div>
    <div v-else class="grid">
        <Horario :bloques="horarios[índiceHorarios]?.flatMap(({ bloques, color }) => bloques.map(bloque => ({...bloque, color}))) || []" />
        <div>
            <div>
                <h2>Grupos a considerar:</h2>
            </div>
            <div>
                <select @change="cambiarSelección(($event.target as HTMLSelectElement).value)">
                    <option disabled value="">Clases</option>
                    <option v-for="selección in selecciones" :value="selección.id">
                        {{ selección.nombre }} ({{ selección.grupos.filter(grupo => grupo.seleccionado).length }} / {{ selección.grupos.length }} )
                    </option>
                </select>
            </div>
            <div>
                <p v-for="grupo in selecciones[índiceSelección].grupos" :key="grupo.id">
                    {{ grupo.nombre }} -  <input type="checkbox" v-model="grupo.seleccionado" />
                </p>
            </div>
        </div>
        <div>
            <button @click="anteriorHorario">Anterior</button>
            <h2>{{ índiceHorarios + 1 }} / {{ horarios.length }}</h2>
            <button @click="siguienteHorario">Siguiente</button>
        </div>
        <div>
            <h2>Cursos Mostrados</h2>
            <p v-for="curso in horarios[índiceHorarios]" :style="{ 
                color: curso.color
             }">{{ curso.nombre }}</p>
        </div>
        <div>
            <button @click="generarHorarios">
                Generar horarios
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import usarLocalStorage from '@Librería/usarLocalStorage';
    import { default as Horario } from '../horario/index.vue'
    import { ref } from 'vue';

    const clases = usarLocalStorage<Clase[]>("clases", [])
    
    function validarSelecciones(seleccionesAlmacenadas: Selección[]) {
        // Si la cantidad de cursos es diferente, definitivamente han cambiado los cursos
        if (clases.value.length !== seleccionesAlmacenadas.length)
            return false

        // Si la cantidad es la misma, verificar que los cursos sean los mismos
        for(let i = 0; i < seleccionesAlmacenadas.length; i++) {
            const claseActual = clases.value[i]

            // Si la id actual no concuerda con alguna almacenada, no es válido
            const claseAlmacenada = seleccionesAlmacenadas.find(clase => clase.id === claseActual.id)

            if (!claseAlmacenada) return false

            // Si la cantidad de grupos es diferente, no es válido
            if (claseAlmacenada.grupos.length !== claseActual.grupos.length) return false

            // Si los grupos del curso actual no concuerdan con los almacenados, no es válido
            for(const grupoActual of claseActual.grupos) {
                if(!claseAlmacenada.grupos.find(grupo => grupo.id === grupoActual.id)) return false
            }

            // NOTA: Los bloques individuales no se registrarán ya que las preferencias son hasta nivel de grupo
        }
     
        return true
    }

    const selecciones = usarLocalStorage<Selección[]>("selecciones", clases.value.map(clase => ({ ...clase, grupos: clase.grupos.map(grupo => ({ ...grupo, seleccionado: true })) })), validarSelecciones)
    const horarios = ref<Curso[][]>([])

    const índiceSelección = ref<number>(0)
    const índiceHorarios = ref<number>(0)

    function cambiarSelección(id: string) {
        const nuevoÍndiceClase = clases.value.findIndex(clase => clase.id === id)

        if (nuevoÍndiceClase !== -1) {
            índiceSelección.value = nuevoÍndiceClase
        }
    }

    function anteriorHorario() {
        if(índiceHorarios.value === 0) {
            índiceHorarios.value = horarios.value.length - 1
        } else {
            índiceHorarios.value--
        }
    }

    function siguienteHorario() {
        if(índiceHorarios.value === horarios.value.length - 1) {
            índiceHorarios.value = 0
        } else {
            índiceHorarios.value++
        }
    }

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
        horarios.value = selecciones.value.map(clase => clase.grupos.filter(grupo => grupo.seleccionado).map(grupo => ({ // De los grupos seleccionados, obtenemos los datos principales
            nombre: `${clase.nombre} [${grupo.nombre}]`,
            color: clase.color,
            bloques: grupo.bloques
        }))).reduce((horariosAnteriores: Curso[][], cursosActuales) => {
            // Cada bloque del horario anterior es comparado con los bloques del curso actual
            // Si no hay intersecciones, este nuevo curso es aceptado
            const resultado: Curso[][] = []

            if (horariosAnteriores.length === 0) {
                return cursosActuales.map(curso => [ curso ])
            }

            for(const horarioAnterior of horariosAnteriores) {
                for(const cursoActual of cursosActuales) {
                    if (esVálido(horarioAnterior, cursoActual)) {
                        resultado.push([...horarioAnterior, cursoActual])
                    }
                }
            }

            return resultado
        }, []) // Empezamos con un horario vacío

        índiceHorarios.value = 0
    }
</script>