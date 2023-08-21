import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const clases = persistentAtom<Clase[]>('clases', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
})
export const horariosGenerados = persistentAtom<Curso[][]>('horarios', [], {
    encode: JSON.stringify,
    decode: JSON.parse
})

export const bloquesVisualizados = atom<readonly BloqueVisual[]>(clases.get()[0]?.grupos[0]?.bloques || [])

export const índiceGenerador = atom<number>(0)
export const índiceMarcador = atom<number>(0)