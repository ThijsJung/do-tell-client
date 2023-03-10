import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journal', {
    state: () => ({
        journals: {},
        entries: {},
    }),
    getters: {
        getAllJournals: (state) => state.journals,
        getJournalName: (state) => {
            return (journalId: string) => {
                let journalName = ''
                if (journalId in state.journals) {
                    journalName = state.journals[journalId].name
                }
                return journalName
            }
        },
        getAllEntriesByJournalId: (state) => {
            return (journalId: string) => {
                console.log(`Getting all entries for journal ID: ${journalId}.`)
                const entries = state.entries[journalId]
                const entriesSortedByDate = Object.values(entries)
                    .sort((a, b) => b.createdAt - a.createdAt)
                return entriesSortedByDate
            }
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