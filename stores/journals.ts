import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journal', {
    state: () => ({
        journals: {},
        entries: {}
    }),
    getters: {
        getAllJournals: (state) => state.journals,
        // getJournalById: (state) => {
        //     return (journalId) => { state.journals[journalId] }
        // }
        getAllEntries: (state) => state.entries,
        getAllEntriesByJournalId: (state) => {
            return (journalId: string) => { state.entries[journalId] }
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