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
    emits: ['closeEntry', 'updateEntry', 'deletedEntry', 'savedEntry'],
    data() {
        return {
            entry: {},
            isEditViewActive: false
        }
    },
    methods: {
        toggleEditView() {
            this.isEditViewActive = !this.isEditViewActive
        },
        deleteEntry(entryId: string) {
            console.log('Deleting entry with ID: ', entryId)
            // Logic to delete entry
            this.$emit('deletedEntry')
        },
        saveEntry(entryId: string, entry) {
            console.log('Saving/Updating entry with ID: ', entryId, entry)
            // Logic to delete entry
            this.$emit('savedEntry')
        }
    }
}
</script>

<template>
    <div class="flex flex-col">
        <TextEntry v-if="entry.content.type === 'text'" :activate-edit-view="isEditViewActive" :entry="entry"
            @update-entry="$emit('updateEntry')" @toggle-edit-view="toggleEditView"></TextEntry>
        <AudioEntry v-else-if="entry.content.type === 'audio'" :entry="entry"></AudioEntry>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('closeEntry')">Back</button>
            <button v-if="isEditViewActive" class="cursor-pointer rounded border-red-600 border-2 py-1 px-2"
                @click="deleteEntry(entry.id)">Delete</button>
            <button v-if="isEditViewActive" class="cursor-pointer rounded border-sky-400 border-2 py-1 px-2"
                @click="saveEntry(entry.id, entry)">Save</button>
        </div>
    </div>
</template>