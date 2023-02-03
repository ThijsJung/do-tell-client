<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    beforeMount() {
        const brokenSelectedEntry = this.store.getEntryById('J-6308', this.entryId)
        console.log(this.entryId, brokenSelectedEntry)
        const selectedEntry = {
            "id": "6c1c5c96-90d3-4d0b-a152-ba036f8d26e1",
            "content": {
                "audioId": "faf289c3-92fc-4730-ad35-2d353c7166f9",
                "type": "audio",
                "language": "es_ES",
                "transcript": "Muahaha! Pues hoy son las diez menos diez. Estamos grabando! Y eso es lo que quería. Bueno, pues ¿Qué os cuento hoy? Bueno, pues fue un día poco especial, fui a trabajar. Cocine un poco.\n\nBueno, intente hacer un smoothie con espinacas y resulta que es mucho más difícil de lo que esperaba. Jeje, no sé, tiene trocitos y se te pegan entre los dientes. Pero no, no paro, voy a intentar otra vez. Bueno, porque tampoco intente, he? Ni busque una receta, ni nada. Es que, me puse en la cocina y dijo: \"Bueno, pues smoothie con espinacas ¿Qué lleva? Espinacas. Bueno, ¿Y qué más? Algo como, algún tipo de yogur, un poco de zumo de naranja, una banana. Bueno, jeje, tambien me quedaba un poco de rucola y pensé: \"Bueno, eso también es verde. Pues, vamos pa' allá. Pero, no se, resulta que el plátano y el zumo de naranja es demasiado, es todo demasiado dulce. No está mal, pero tampoco sabe como un smoothie sano.\n\nBueno. Y ¿Qué más? ¿Que más os cuento? Tampoco mucho, que ayer visite... No, eso ya lo conté. Pues nada. Bueno, pues si nada, nada. Nos vemos mañana, chao!"
            },
            "createdAt": 1659383546,
            "location": {
                "city": "Amsterdam",
                "country": "The Netherlands"
            },
            "title": "Intento de hacer un smoothie sano"
        }
        this.entry = selectedEntry
    },
    props: {
        entryId: String,
    },
    emits: ['closeEntry'],
    data() {
        return {
            entry: {}
        }
    }
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <TextEntry v-if="entry.content.type === 'text'" :entry="entry"></TextEntry>
        <AudioEntry v-else-if="entry.content.type === 'audio'" :entry="entry"></AudioEntry>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('closeEntry')">Back</button>
        </div>
    </div>
</template>