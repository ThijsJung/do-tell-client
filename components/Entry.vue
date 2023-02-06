<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        if (this.checkIfObjectIsEmpty(this.entry)) {
            this.isEditViewActive = true
        }
    },
    props: {
        selectedEntry: Object,
        entryType: String
    },
    emits: ['closeEntry', 'updateEntry', 'deletedEntry', 'savedEntry'],
    data() {
        return {
            entry: this.selectedEntry,
            type: this.entryType,
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
        },
        checkIfObjectIsEmpty(obj) {
            // According to: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            return (// because Object.keys(new Date()).length === 0;
                // we have to do some additional check
                obj // 👈 null and undefined check
                && Object.keys(obj).length === 0
                && Object.getPrototypeOf(obj) === Object.prototype)
        }
    }
}
</script>

<template>
    <div class="flex flex-col">
        <TextEntry v-if="type === 'text'" :activate-edit-view="isEditViewActive" :entry="selectedEntry"
            @update-entry="$emit('updateEntry')" @toggle-edit-view="toggleEditView"></TextEntry>
        <AudioEntry v-else-if="type === 'audio'" :entry="entry"></AudioEntry>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('closeEntry')">Back</button>
            <button v-if="isEditViewActive" class="cursor-pointer rounded border-red-600 border-2 py-1 px-2"
                @click="deleteEntry(selectedEntry.id)">Delete</button>
            <button v-if="isEditViewActive" class="cursor-pointer rounded border-sky-400 border-2 py-1 px-2"
                @click="saveEntry(selectedEntry.id, entry)">Save</button>
        </div>
    </div>
</template>