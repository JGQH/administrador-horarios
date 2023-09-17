import { action, atom, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { clases, grupos, bloques } from "./clases";

export const horariosGenerados = persistentAtom<Curso[][]>('horarios', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
})

export const idClaseMarcada = atom<IdClase | undefined>(clases.get()[0]?.id)
export const índiceGenerador = atom<number>(0)

export const horarioGeneradoVisualizado = computed([horariosGenerados, índiceGenerador], ($horariosGenerados, $indexGenerador) => {
    const horarioActual = $horariosGenerados[$indexGenerador]

    if (!horarioActual) return []

    return horarioActual
    //return horarioActual.flatMap(({ nombre, bloques, color }) => bloques.map(bloque => ({ ...bloque, nombre, color })))
})

// ROTAR
export const rotarÍndice = action(índiceGenerador, 'rotarAnterior', (store, función: 'siguiente'|'anterior') => {
    const límites = horariosGenerados.get().length
    const nuevoÍndice = función === 'anterior' ? store.get() - 1 : store.get() + 1

    store.set(nuevoÍndice < 0 ? límites - 1 : nuevoÍndice % límites)
})

// GENERAR
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

    // No hubieron colisiones, así que el nuevoCurso puede ser agregado sin problema alguno
    return true
}

export const generarHorarios = () => {
    // Obtenemos el estado actual de las clases, grupos y bloques
    const $clases = clases.get()
    const $grupos = grupos.get()
    const $bloques = bloques.get()

    const $sistema: Sistema = $clases.map(clase => ({
        ...clase,
        grupos: $grupos.filter(grupo => grupo.clase === clase.id).map(grupo => ({
            ...grupo,
            bloques: $bloques.filter(bloque => bloque.grupo === grupo.id)
        }))
    }))

    // Solo consideramos las clases que tengan, al menos, 1 grupo seleccionado
    const clasesConsideradas = $sistema.filter(clase => clase.grupos.filter(grupo => grupo.seleccionado).length > 0)

    if (clasesConsideradas.length === 0) { // Si no hay clases a evaluar, nos saltamos la evaluación
        horariosGenerados.set([])
        return
    }

    // Convertimos las clases consideradas a datos que se puedan usar, y solo los grupos a considerar
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
    horariosGenerados.set([...horariosConsiderados])
}