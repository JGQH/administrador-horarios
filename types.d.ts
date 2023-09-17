type IdClase = `idc:${string}`
type IdGrupo = `idg:${string}`
type IdBloque = `idb:${string}`

type Clase = {
    nombre: string
    color: string
    id: IdClase
}

type Grupo = {
    nombre: string
    seleccionado: boolean
    id: IdGrupo
    clase: IdClase
}

type Bloque = {
    día: number
    inicio: number
    final: number
    id: IdBloque
    grupo: IdGrupo
}

type Sistema = Array<Clase & {
    grupos: Array<Grupo & {
        bloques: Array<Bloque>
    }>
}>
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

// Para el sistema de horarios favoritos
type IdSeparador = `ids:${string}`
type IdHorarioFavorito = `idf:${string}`

type Separador = {
    nombre: string,
    id: IdSeparador,
}

type HorarioFavorito = {
    separador: IdSeparador
    id: IdHorarioFavorito
    cursos: readonly Curso[]
}