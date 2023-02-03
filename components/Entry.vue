<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    beforeMount() {
        const selectedEntry = this.store.getEntryById(this.journalId, this.entryId)
        this.entry = selectedEntry
    },
    props: {
        journalId: String,
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