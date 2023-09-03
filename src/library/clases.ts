import { action } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { v4 as uuid} from 'uuid'

export const clases = persistentAtom<Clase[]>('clases', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
})

// UTILIDADES
export const cambiarColor = action(clases, 'cambiarColor', (store, indexClase: number, nuevoColor: string) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].color = nuevoColor
    store.set([...nuevasClases])
})

// AGREGAR
export const agregarClase = action(clases, 'agregarClase', (store) => {
    store.set([...store.get(), {
        nombre: "",
        color: "#FFAAAA",
        id: uuid(),
        grupos: []
    }])
})

export const agregarGrupo = action(clases, 'agregarGrupo', (store, indexClase: number) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].grupos.push({ nombre: '', id: uuid(), seleccionado: true, bloques: [] })
    store.set([...nuevasClases])
})

export const agregarBloque = action(clases, 'agregarBloque', (store, indexClase: number, indexGrupo: number) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].grupos[indexGrupo].bloques.push({ día: 0, inicio: 0, final: 1, id: uuid() })
    store.set([...nuevasClases])
})

// ELIMINAR
export const eliminarClase = action(clases, 'eliminarClase', (store, indexClase: number) => {
    const nuevasClases = store.get()
    nuevasClases.splice(indexClase, 1)
    store.set([...nuevasClases])
})

export const eliminarGrupo = action(clases, 'eliminarGrupo', (store, indexClase: number, indexGrupo: number) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].grupos.splice(indexGrupo, 1)
    store.set([...nuevasClases])
})

export const eliminarBloque = action(clases, 'eliminarBloque', (store, indexClase: number, indexGrupo: number, indexBloque: number) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].grupos[indexGrupo].bloques.splice(indexBloque, 1)
    store.set([...nuevasClases])
})

// RENOMBRAR
export const renombrarClase = action(clases, 'renombrarClase', (store, indexClase: number, nuevoNombre:string) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].nombre = nuevoNombre
    store.set([...nuevasClases])
})

export const renombrarGrupo = action(clases, 'renombrarGrupo', (store, indexClase: number, indexGrupo: number, nuevoNombre: string) => {
    const nuevasClases = store.get()
    nuevasClases[indexClase].grupos[indexGrupo].nombre = nuevoNombre
    store.set([...nuevasClases])
})

export const reprogramarBloque = action(clases, 'reprogramarBloque', (store, indexClase: number, indexGrupo: number, indexBloque: number, nuevoBloque: Bloque) => {
   const nuevasClases = store.get()
   nuevasClases[indexClase].grupos[indexGrupo].bloques[indexBloque] = nuevoBloque
   store.set([...nuevasClases])
})