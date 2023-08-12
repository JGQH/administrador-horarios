import { Ref, ref, watch } from "vue"

export default function usarLocalStorage<T>(etiqueta: string, valorPorDefecto: T, validar?: (valorAlmacenado: T) => boolean): Ref<T> {
    const valor = ref() as Ref<T>

    if (typeof window !== 'undefined') {
        try {
            const item = window.localStorage.getItem(etiqueta)

            if(item) {
                const resultado = JSON.parse(item) as T
                valor.value = validar ? (validar(resultado) ? resultado : valorPorDefecto) : resultado
            } else {
                valor.value = valorPorDefecto
            }
        } catch (error) {
            console.error('Error: ', error)

            valor.value = valorPorDefecto
        }

        watch(valor, (nuevoValor) => {
            try {
                window.localStorage.setItem(etiqueta, JSON.stringify(nuevoValor))
            } catch (error) {
                console.log('Error: ', error)
            }
        }, {
            deep: true
        })
    }

    return valor
}