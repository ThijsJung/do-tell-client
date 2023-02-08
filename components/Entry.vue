<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        if (this.isNewEntry(this.selectedEntry)) {
            this.isEditViewActive = true
        }
    },
    props: {
        selectedEntry: Object,
        entryType: String,
        journalId: String
    },
    emits: ['closeEntry', 'updateEntry', 'deletedEntry', 'savedEntry'],
    data() {
        return {
            title: this.isNewEntry(this.selectedEntry) ? '' : this.selectedEntry.title,
            description: this.isNewEntry(this.selectedEntry) ? '' : this.selectedEntry.content.text,
            createdAt: this.isNewEntry(this.selectedEntry) ? Math.floor(Date.now() / 1000) : this.selectedEntry.createdAt,
            id: this.isNewEntry(this.selectedEntry) ? 'newEntryId' : this.selectedEntry.id,
            isEditViewActive: false,
        }
    },
    methods: {
        isNewEntry(entry) {
            return (entry === null)
        },
        toggleEditView() {
            this.isEditViewActive = !this.isEditViewActive
        },
        deleteEntry(journalId: string, entryId: string) {
            console.log(`Deleted entry. Journal ID: ${journalId}', entryId: ${entryId}`)
            this.store.deleteEntry(journalId, entryId)
            this.$emit('deletedEntry')
        },
        async saveEntry(journalId: string, entryId: string, title: string, description: string, createdAt: number) {
            if (entryId === 'newEntryId'){
                entryId = await fetch('https://www.uuidtools.com/api/generate/v4').then((response) => response.json()).then((data) => data[0])
                createdAt = Math.floor(Date.now() / 1000)
            }
            const entry = {
                "id": entryId,
                "content": {
                    type: 'text',
                    language: 'en_US',
                    text: description
                },
                "createdAt": createdAt,
                "location": {
                    "city": "Amsterdam",
                    "country": "The Netherlands"
                },
                "title": title
            }
            this.store.addEntry(this.journalId, entry)
            console.log(`Saved entry. Journal ID: ${journalId}', entry: ${entry}`)
            this.$emit('savedEntry')
        }
    }
}
</script>

<template>
    <div class="flex flex-col">
        <article class="p-1 m-1 flex flex-col">
            <div class="flex text-xl">
                <div>
                    <span class="material-symbols-outlined align-middle">draw</span>
                </div>
                <div v-if="!isEditViewActive" class="grow">
                    {{ title }}
                </div>
                <div v-else class="grow">
                    <input v-model="title"
                        class="w-full mb-1 border-none focus:outline-none bg-black text-white text-xl" type="text"
                        placeholder="Untitled entry" autofocus>
                </div>
                <div v-if="!isEditViewActive">
                    <span class="material-symbols-outlined align-middle hover:bg-sky-200 cursor-pointer"
                        @click="toggleEditView">
                        edit
                    </span>
                </div>
            </div>
            <div class="text-xs my-1">
                {{ epochToDateString(createdAt) }}
            </div>
            <div v-if="!isEditViewActive">
                <p class="py-1" v-for="paragraph in description.split('\n')">{{ paragraph }}</p>
            </div>
            <div v-else>
                <textarea v-model="description"
                    class="w-full h-80 border-none bg-black text-white" placeholder="Do tell..."></textarea>
            </div>
        </article>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('closeEntry')">Back</button>
            <button v-if="isEditViewActive && !isNewEntry(selectedEntry)" class="cursor-pointer rounded border-red-600 border-2 py-1 px-2"
                @click="deleteEntry(journalId, id)">Delete</button>
            <button v-if="isEditViewActive" class="cursor-pointer rounded border-sky-400 border-2 py-1 px-2"
                @click="saveEntry(journalId, id, title, description, createdAt)">Save</button>
        </div>
    </div>
</template>