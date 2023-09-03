import { v4 as uuid } from 'uuid'
import { action, atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const horariosFavoritos = persistentAtom<Agrupación[]>('favoritos', [{ nombre: "(No agrupados)", id: '0', contenido: [] }], {
    encode: JSON.stringify,
    decode: JSON.parse
})

export const bloquesVisualizados = atom<readonly BloqueVisual[]>([])

// MOSTRADOR
export const mostrarHorario = action(bloquesVisualizados, 'mostrarHorario', (store, horario: readonly Curso[]) => {
    const bloques = horario.flatMap(({ nombre, bloques, color }) => bloques.map(bloque => ({ nombre, color, ...bloque })))

    store.set(bloques)
})

// SEPARADORES
export const agregarSeparador = action(horariosFavoritos, 'agregarSeparador', (store) => {
    const agrupados = store.get().filter(separador => separador.id !== '0')
    const desagrupados = store.get().find(separador => separador.id === '0')

    if (desagrupados) {
        store.set([...agrupados, { nombre: '', id: uuid(), contenido:[] }, desagrupados])
    }
})

export const renombrarSeparador = action(horariosFavoritos, 'renombrarSeparador', (store, nuevoNombre: string, indexFavorito: number) => {
    const nuevosHorariosFavoritos = store.get()
    nuevosHorariosFavoritos[indexFavorito].nombre = nuevoNombre
    store.set([...nuevosHorariosFavoritos])
})

export const eliminarSeparador = action(horariosFavoritos, 'eliminarSeparador', (store, indexFavorito: number) => {
    const nuevosHorariosFavoritos = store.get()
    nuevosHorariosFavoritos.splice(indexFavorito, 1)

    store.set([...nuevosHorariosFavoritos])
})

// HORARIOS
export const eliminarHorario = action(horariosFavoritos, 'eliminarHorario', (store, indexFavorito: number, indexHorario: number) => {
    const nuevosHorariosFavoritos = store.get()
    nuevosHorariosFavoritos[indexFavorito].contenido.splice(indexHorario, 1)

    store.set([...nuevosHorariosFavoritos])
})

export const moverHorario = action(horariosFavoritos, 'moverHorario', (store, indexHorario: number, indexFavoritoOrigen: number, indexFavoritoDestino: number) => {
    const nuevosHorariosFavoritos = store.get()

    const [ horario ] = nuevosHorariosFavoritos[indexFavoritoOrigen].contenido.splice(indexHorario, 1)
    nuevosHorariosFavoritos[indexFavoritoDestino].contenido.push(horario)

    store.set([...nuevosHorariosFavoritos])
})