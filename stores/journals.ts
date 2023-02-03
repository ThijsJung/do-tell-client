import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journal', {
    state: () => ({
        journals: {}
    }),
    getters: {
        getAllJournals: (state) => state.journals,
        getJournalById: (state) => {
            return (journalId) => { state.journals[journalId] }
        }
    },
    actions: {
        addJournal(journal) {
            this.journals[journal.id] = journal
        },
        deleteJournal(journalId) {
            delete this.journals[journalId]
        }
    },
})