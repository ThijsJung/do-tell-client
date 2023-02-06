<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    data() {
        return {
            lastNewEntryId: 0,  // To be deleted once the entries are sent to the API which returns an ID.
        }
    },
    props: {
        newEntryType: String,
        journalId: String
    },
    emits: ['cancelEditEntry', 'savedEntry'],
    methods: {
        saveEntry(id: string, title: string, content) {
            if (id === 'newEntryId') {
                this.lastNewEntryId++
                id = this.lastNewEntryId.toString()
            }
            const entry = {
                "id": id,
                "content": content,
                "createdAt": 1659383546,
                "location": {
                    "city": "Amsterdam",
                    "country": "The Netherlands"
                },
                "title": title
            }
            console.log('New Entry: ', this.journalId, entry)
            this.store.addEntry(this.journalId, entry)
            this.$emit('savedEntry', content)
        }
    }
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <NewTextEntry v-if="newEntryType === 'text'" @save-entry="saveEntry" @cancel-edit-entry="$emit('cancelEditEntry')"></NewTextEntry>
        <NewAudioEntry v-else-if="newEntryType === 'audio'"></NewAudioEntry>
        <NewImageEntry v-else-if="newEntryType === 'image'"></NewImageEntry>
    </div>
</template>