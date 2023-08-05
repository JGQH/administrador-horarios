type Clase = {
    nombre: string,
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