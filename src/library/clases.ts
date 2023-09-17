import { action } from "nanostores";
import { persistentAtom} from "@nanostores/persistent";
import { v4 as uuid} from 'uuid'

export const clases = persistentAtom<Clase[]>('v2:clases', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
})

export const grupos = persistentAtom<Grupo[]>('v2:grupos', [], {
    encode: JSON.stringify,
    decode: JSON.parse
})

export const bloques = persistentAtom<Bloque[]>('v2:bloques', [], {
    encode: JSON.stringify,
    decode: JSON.parse
})

// UTILIDADES
export const cambiarColor = action(clases, 'cambiarColor', (store, idClase: IdClase, nuevoColor: string) => {
    const nuevasClases = store.get()

    const indexClase = nuevasClases.findIndex(clase => clase.id === idClase)

    if (indexClase !== -1) {
        nuevasClases[indexClase].color = nuevoColor
        store.set([...nuevasClases])
    }
})

export const accionarGrupo = action(grupos, 'accionarGrupo', (store, idGrupo: IdGrupo) => {
    const nuevosGrupos = store.get()

    const indexGrupo = nuevosGrupos.findIndex(grupo => grupo.id === idGrupo)

    if (indexGrupo !== -1) {
        nuevosGrupos[indexGrupo].seleccionado = !nuevosGrupos[indexGrupo].seleccionado

        store.set([...nuevosGrupos])
    }
})

// AGREGAR
export const agregarClase = action(clases, 'agregarClase', (store) => {
    store.set([...store.get(), {
        nombre: "",
        color: "#FFAAAA",
        id: `idc:${uuid()}`
    }])
})

export const agregarGrupo = action(grupos, 'agregarGrupo', (store, idClase: IdClase) => {
    store.set([...store.get(), {
        nombre: '',
        id: `idg:${uuid()}`,
        seleccionado: true,
        clase: idClase
    }])
})

export const agregarBloque = action(bloques, 'agregarBloque', (store, idGrupo: IdGrupo) => {
    store.set([...store.get(), {
        día: 0,
        inicio: 0,
        final: 1,
        id: `idb:${uuid()}`,
        grupo: idGrupo,
    }])
})

// ELIMINAR
export const eliminarClase = action(clases, 'eliminarClase', (store, idClase: IdClase) => {
    // Eliminamos los grupos que vinculen a esta clase
    eliminarGrupos(idClase)

    // Colocamos aquellas clases que no tengan la ID de la clase a eliminar
    store.set([...store.get().filter(clase => clase.id !== idClase)])
})

const eliminarGrupos = action(grupos, 'eliminarGrupos', (store, idClase: IdClase) => {
    const nuevosGrupos = [...store.get()]

    // Por cada grupo con la ID de la clase a eliminar, eliminamos también sus bloques
    nuevosGrupos.filter(grupo => grupo.clase === idClase).forEach(grupo => eliminarBloques(grupo.id))

    // Colocamos aquellos grupos que no tengan la ID de la clase a eliminar
    store.set([...nuevosGrupos.filter(grupo => grupo.clase !== idClase)])
})

export const eliminarGrupo = action(grupos, 'eliminarGrupo', (store, idGrupo: IdGrupo) => {
    // Colocamos aquellos grupos que no tengan la ID del grupo a eliminar
    store.set([...store.get().filter(grupo => grupo.id !== idGrupo)])
})

const eliminarBloques = action(bloques, 'eliminarBloques', (store, idGrupo: IdGrupo) => {
    // Colocamos aquellos grupos que no tengan la ID del grupo a eliminar
    store.set([...store.get().filter(bloque => bloque.grupo !== idGrupo)])
})

export const eliminarBloque = action(bloques, 'eliminarBloque', (store, idBloque: IdBloque) => {
    // Colocamos aquellos grupos que no tengan la ID del bloque a eliminar
    store.set([...store.get().filter(bloque => bloque.id !== idBloque)])
})

// RENOMBRAR
export const renombrarClase = action(clases, 'renombrarClase', (store, idClase: IdClase, nuevoNombre:string) => {
    const nuevasClases = store.get()

    const indexClase = nuevasClases.findIndex(clase => clase.id === idClase)

    if (indexClase !== -1) {
        nuevasClases[indexClase].nombre = nuevoNombre

        store.set([...nuevasClases])
    }
})

export const renombrarGrupo = action(grupos, 'renombrarGrupo', (store, idGrupo: IdGrupo, nuevoNombre: string) => {
    const nuevosGrupos = store.get()

    const indexGrupo = nuevosGrupos.findIndex(grupo => grupo.id === idGrupo)

    if (indexGrupo !== -1) {
        nuevosGrupos[indexGrupo].nombre = nuevoNombre

        store.set([...nuevosGrupos])
    }
})

export const reprogramarBloque = action(bloques, 'reprogramarBloque', (store, idBloque: IdBloque, nuevoBloque: Omit<Bloque, 'id'>) => {
    const nuevosBloques = store.get()

    const indexBloque = nuevosBloques.findIndex(bloque => bloque.id === idBloque)

    if (indexBloque !== -1) {
        nuevosBloques.splice(indexBloque, 1, {...nuevoBloque, id: idBloque})

        store.set([...nuevosBloques])
    }
})