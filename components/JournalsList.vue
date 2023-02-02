<script lang="ts">
export default {
    props: ['journals'],
    data() {
        return {
            editJournal: false,
            journalName: "",
            journalDescription: "",
            journalId: 0,
            allJournals: {},
            lastJournalId: 0 // To be deleted once the journals are sent to the API which returns an ID.
        }
    },
    created() {
        this.lastJournalId = this.journals.length
        this.allJournals = this.journals.reduce((obj, journal) => (obj[journal.id] = journal, obj) ,{})
    },
    methods: {
        createJournal() {
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
        saveJournal(name: string, description: string, id: number){
            if (id === 0) {
                this.lastJournalId++
                id = this.lastJournalId
            }
            this.allJournals[id] = {
                id: id,
                name: name,
                description: description
            }
            this.editJournal = false
        },
        deleteJournal(id: number){
            delete this.allJournals[id]
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
        <NewJournal v-if="editJournal" :journal-name="journalName" :journal-description="journalDescription" :journal-id="journalId"
            @cancel-edit-journal="cancelEditJournal" @save-journal="saveJournal" @delete-journal="deleteJournal">
        </NewJournal>
        <article v-else class="p-1 m-1 flex flex-col " v-for="journal in allJournals" :key="journal.id">
            <div class="flex">
                <div class="text-xl grow" @click="$router.push(`/journal/${journal.id}`)">
                    {{ journal.name }}
                </div>
                <span class="material-symbols-outlined w-8 h-8 hover:bg-sky-200 cursor-pointer"
                    @click="updateJournal(journal.name, journal.description, journal.id)">
                    edit
                </span>
            </div>
            <div @click="$router.push(`/journal/${journal.id}`)">
                {{ journal.description }}
            </div>
        </article>
    </div>
</template>