import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journal', {
    state: () => ({
        journals: {},
        entries: {}
    }),
    getters: {
        getAllJournals: (state) => state.journals,
        getAllEntries: (state) => state.entries,
        getAllEntriesByJournalId: (state) => {
            return (journalId: string) => { state.entries[journalId] }
        },
        getEntryById: (state) => {
            return (journalId: string, entryId: string) => { 
                console.log(`Getting entry for journal ID: ${journalId}, entry ID: ${entryId}`)
                const entry = state.entries[journalId][entryId]
                return entry
            }
        }
    },
    actions: {
        addJournal(journal) {
            this.journals[journal.id] = journal
        },
        deleteJournal(journalId: string) {
            delete this.journals[journalId]
            if (journalId in this.entries) {
                delete this.entries[journalId]
            }
        },
        addEntry(journalId: string, entry) {
            if (!(journalId in this.entries)) {
                this.entries[journalId] = {}
            }
            this.entries[journalId][entry.id] = entry
        },
        deleteEntry(journalId: string, entryId: string) {
            delete this.entries[journalId][entryId]
        }
    },
})