import { Ref, ref, watch } from "vue"

export default function usarLocalStorage<T>(etiqueta: string, porDefecto: T): Ref<T> {
    const valor = ref() as Ref<T>

    if (typeof window !== 'undefined') {
        try {
            const item = window.localStorage.getItem(etiqueta)

            if(item) {
                valor.value = JSON.parse(item) as T
            } else {
                valor.value = porDefecto
            }
        } catch (error) {
            console.error('Error: ', error)

            valor.value = porDefecto
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