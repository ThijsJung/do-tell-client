<script lang="ts">
import { useJournalStore } from '@/stores/journals'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        this.lastJournalId = Object.keys(this.store.getAllJournals).length
    },
    props: {
        journals: Object
    },
    data() {
        return {
            editJournal: false,
            journalName: "",
            journalDescription: "",
            journalId: 0,
            lastJournalId: 0 // To be deleted once the journals are sent to the API which returns an ID.
        }
    },
    methods: {
        createJournal() {
            // TODO: Shouldn't this be on the NewJournal component?
            this.journalName = ""
            this.journalDescription = ""
            this.journalId = 0
            this.editJournal = true
        },
        updateJournal(name: string, description: string, id: number) {
            this.journalName = name
            this.journalDescription = description
            this.journalId = id
            this.editJournal = true
        },
        saveJournal(name: string, description: string, id: number) {
            if (id === 0) {
                this.lastJournalId++
                id = this.lastJournalId
            }
            if (name === "") {
                name = "Untitled journal"
            }
            if (description === "") {
                description = "Short description..."
            }
            const newJournal = {
                id: id,
                name: name,
                description: description
            }
            this.store.addJournal(newJournal)
            this.editJournal = false
        },
        deleteJournal(id: number) {
            this.store.deleteJournal(id)
            this.editJournal = false
        },
        cancelEditJournal() {
            this.editJournal = false
        }
    }
}
</script>

<template>
    <div>
        <div class="flex flex-row">
            <div class="basis-4/5">All journals</div>
            <div>
                <button class="cursor-pointer rounded border-white border-2 px-2" @click="createJournal()">New</button>
            </div>
        </div>
        <NewJournal v-if="editJournal" :journal-name="journalName" :journal-description="journalDescription"
            :journal-id="journalId" @cancel-edit-journal="cancelEditJournal" @save-journal="saveJournal"
            @delete-journal="deleteJournal">
        </NewJournal>
        <Journal v-else v-for="journal in journals" :key="journal.id" :journal-name="journal.name"
            :journal-description="journal.description" :journal-id="journal.id" @update-journal="updateJournal">
        </Journal>
    </div>
</template>