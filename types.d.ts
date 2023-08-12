type Clase = {
    nombre: string,
    color: string,
    id: string,
    grupos: Grupo[]
}

type Grupo = {
    nombre: string,
    id: string,
    bloques: Bloque[]
}

type Bloque = {
    id: string,
    día: number,
    inicio: number,
    final:number
}

// Versión comprimida de "Clase" con "Grupo"
type Curso = {
    nombre: string,
    color: string,
    bloques: Bloque[]
}

type BloqueVisual = Bloque & {
    color?: string
}

type Selección = Omit<Clase, 'grupos'> & {
    grupos: Array<Grupo & {
        seleccionado: boolean
    }>
}