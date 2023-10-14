<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        if (this.isNewEntry(this.selectedEntry, 'created')) {
            this.isEditViewActive = true
        }
    },
    props: {
        selectedEntry: Object,
        journalId: String
    },
    emits: ['closeEntry', 'updateEntry', 'deletedEntry', 'savedEntry'],
    data() {
        return {
            id: this.isNewEntry(this.selectedEntry) ? 'newEntryId' : this.selectedEntry.id,
            title: this.isNewEntry(this.selectedEntry) ? '' : this.selectedEntry.title,
            createdAt: this.isNewEntry(this.selectedEntry) ? Math.floor(Date.now() / 1000) : this.selectedEntry.createdAt,
            description: this.isNewEntry(this.selectedEntry) ? '' : this.selectedEntry.content.text,
            transcript: this.isNewEntry(this.selectedEntry) ? '' : this.selectedEntry.content.transcript,
            content: this.selectedEntry.content,
            isEditViewActive: false,
        }
    },
    computed: {
        // a computed getter
        contentType(): string {
            return this.selectedEntry.content.type
        }
    },
    methods: {
        isNewEntry(entry) {
            return (!('id' in entry))
        },
        toggleEditView() {
            this.isEditViewActive = !this.isEditViewActive
        },
        deleteEntry(journalId: string, entryId: string) {
            console.log(`Deleted entry. Journal ID: ${journalId}', entryId: ${entryId}`)
            this.store.deleteEntry(journalId, entryId)
            this.$emit('deletedEntry')
        },
        updateContent(newContent) {
            this.content = newContent
        },
        async saveEntry(journalId: string, entryId: string, title: string, content: object, createdAt: number) {
            if (entryId === 'newEntryId') {
                entryId = await fetch('https://www.uuidtools.com/api/generate/v4').then((response) => response.json()).then((data) => data[0])
                createdAt = Math.floor(Date.now() / 1000)
            }
            const entry = {
                "id": entryId,
                "content": content,
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
    <div class="flex flex-col justify-between h-full">
        <article class="p-1 m-1 flex flex-col min-h-[70vh]">
            <div class="flex text-xl">
                <div v-if="!isEditViewActive" class="grow">
                    {{ title }}
                </div>
                <div v-else class="grow">
                    <input v-model="title" class="w-full mb-1 border-none focus:outline-none bg-black text-white text-xl"
                        type="text" placeholder="Untitled entry" autofocus>
                </div>
            </div>
            <div class="text-xs my-1">
                {{ epochToDateString(createdAt) }}
            </div>
            <div>
                <TextContent v-if="contentType === 'text'" :content="content" :is-edit-view-active="isEditViewActive"
                    @updated-content="updateContent"></TextContent>
                <AudioContent v-else-if="contentType === 'audio'" :content="content" :is-edit-view-active="isEditViewActive"
                    @updated-content="updateContent"></AudioContent>
            </div>
        </article>
        <div v-if="isEditViewActive" class="flex justify-between pt-2 mb-20">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2" @click="toggleEditView">
                Cancel
            </button>
            <button v-if="isEditViewActive && !isNewEntry(selectedEntry)"
                class="cursor-pointer rounded border-red-600 border-2 py-1 px-2"
                @click="deleteEntry(journalId, id)">Delete</button>
            <button v-if="isEditViewActive" class="cursor-pointer rounded border-sky-400 border-2 py-1 px-2"
                @click="saveEntry(journalId, id, title, content, createdAt)">Save</button>
        </div>
        <div v-else class="flex justify-center pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2" @click="toggleEditView">
                Edit
            </button>
        </div>
    </div>
</template>