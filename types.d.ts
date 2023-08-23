type Clase = {
    nombre: string,
    color: string,
    id: string,
    grupos: Grupo[]
}

type Grupo = {
    nombre: string,
    id: string,
    bloques: Bloque[],
    seleccionado?: boolean
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
    bloques: readonly Bloque[]
}

type BloqueVisual = Bloque & {
    nombre?: string
    color?: string
}

// Para las preguntas del FAQ
type Pregunta = {
    pregunta: string,
    orden: number
}