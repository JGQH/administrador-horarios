import { v4 as uuid } from 'uuid'
import { action, atom, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const separadores = persistentAtom<Separador[]>('v2:agrupaciones', [{
    nombre: '(No agrupados)',
    id: 'ids:0'
}], {
    encode: JSON.stringify,
    decode: JSON.parse
})

export const horariosFavoritos = persistentAtom<HorarioFavorito[]>('v2:favoritos', [], {
    encode: JSON.stringify,
    decode: JSON.parse
})

export const idHorarioFavoritoVisualizado = atom<IdHorarioFavorito | undefined>()

export const horarioFavoritoVisualizado = computed([horariosFavoritos, idHorarioFavoritoVisualizado], ($horariosFavoritos, $idHorarioFavoritoVisualizado) => {
    if (!$idHorarioFavoritoVisualizado) return []

    const cursos = $horariosFavoritos.find(horarioFavorito => horarioFavorito.id === $idHorarioFavoritoVisualizado)?.cursos

    if (!cursos) return []

    return cursos
})

// SEPARADORES
export const agregarSeparador = action(separadores, 'agregarSeparador', (store) => {
    const nuevosSeparadores = store.get()

    nuevosSeparadores.splice(nuevosSeparadores.length - 1, 0, { nombre: '', id: `ids:${uuid()}` })

    store.set([...nuevosSeparadores])
})

export const renombrarSeparador = action(separadores, 'renombrarSeparador', (store, nuevoNombre: string, idSeparador: IdSeparador) => {
    const nuevosSeparadores = store.get()

    const indexSeparador = nuevosSeparadores.findIndex(separador => separador.id === idSeparador)

    if (indexSeparador !== -1) {
        nuevosSeparadores[indexSeparador].nombre = nuevoNombre

        store.set([...nuevosSeparadores])
    }
})

export const eliminarSeparador = action(separadores, 'eliminarSeparador', (store, idSeparador: IdSeparador) => {
    store.set([...store.get().filter(separador => separador.id !== idSeparador)])

    eliminarHorarios(idSeparador)
})

// HORARIOS
export const agregarHorario = action(horariosFavoritos, 'agregarHorarios', (store, cursos: readonly Curso[]) => {
    store.set([...store.get(), { separador: 'ids:0', id: `idf:${uuid()}`, cursos }])
})

const eliminarHorarios = action(horariosFavoritos, 'eliminarHorarios', (store, idSeparador: IdSeparador) => {
    store.set([...store.get().filter(horario => horario.separador !== idSeparador)])
})

export const eliminarHorario = action(horariosFavoritos, 'eliminarHorario', (store, idHorarioFavorito: IdHorarioFavorito) => {
    store.set([...store.get().filter(horario => horario.id !== idHorarioFavorito)])
})

export const mostrarHorario = action(idHorarioFavoritoVisualizado, 'mostrarHorario', (store, idHorarioFavorito: IdHorarioFavorito) => {
    store.set(idHorarioFavorito)
})

export const moverHorario = action(horariosFavoritos, 'moverHorario', (store, idHorarioFavorito: IdHorarioFavorito, idSeparadorDestino: IdSeparador) => {
    const nuevosHorariosFavoritos = store.get()

    const indexHorarioFavorito = nuevosHorariosFavoritos.findIndex(horario => horario.id === idHorarioFavorito)

    if (indexHorarioFavorito !== -1) {
        nuevosHorariosFavoritos[indexHorarioFavorito].separador = idSeparadorDestino

        store.set([...nuevosHorariosFavoritos])
    }
})