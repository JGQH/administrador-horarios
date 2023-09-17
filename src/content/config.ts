import { z, defineCollection } from 'astro:content'

const preguntasCollection = defineCollection({
    type: 'content',
    schema: z.object({
        pregunta: z.string(),
        orden: z.number()
    })
})

export const collections = {
    preguntas: preguntasCollection
}