<script lang="ts">
import { useJournalStore } from '@/stores/journals'


const journals = [
    { id: 1, name: "Espanol", description: "Un sitio donde dejar todos mis pensamientos espanoles." },
    { id: 2, name: "Dreams", description: "An overview of my subconsciousness, as presented to me during the night time." }
]

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        for (const journal of journals){
            this.store.addJournal(journal)
        }
    },
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <JournalsList :journals="store.getAllJournals"></JournalsList>
    </div>
</template>
