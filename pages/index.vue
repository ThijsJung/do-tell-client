<script lang="ts">
import { useJournalStore } from '@/stores/journals'
import { journals as mockJournals } from '@/data/mockJournals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        for (const journal of mockJournals){
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
