<script lang="ts">
import { useJournalStore } from '@/stores/journals'
import { allEntries as mockEntries } from '@/data/mockEntries'

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    beforeMount() {
        const journalId = this.$route.params.journalId
        for (const entry of mockEntries[journalId]) {
            this.store.addEntry(journalId, entry)
        }
        this.journalId = journalId
    },
    data() {
        return {
            journalId: '',
            selectedEntry: {},

            showNewEntryOptions: false,
            activeComponentView: 'summaries'  // Enum: ['summaries', 'entry']
        }
    },
    computed: {
        summariesViewIsActive() {
            return this.activeComponentView === 'summaries'
        }
    },
    methods: {
        createNewEntry(newEntryType: string) {
            this.selectedEntry = {
                content: {
                    type: newEntryType
                }
            }
            this.showNewEntryOptions = false
            this.activeComponentView = 'entry'
        },
        selectEntry(entryId: string) {
            const entry = this.store.getEntryById(this.journalId, entryId)
            this.selectedEntry = entry
            this.showNewEntryOptions = false
            this.activeComponentView = 'entry'
        },
        closeEntry() {
            this.activeComponentView = 'summaries'
        }
    }
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <div class="flex flex-row">
            <div class="grow">
                <NuxtLink class="underline" to="/">All journals</NuxtLink> > <span
                    :class="{ underline: !summariesViewIsActive }" @click="closeEntry">{{
                        store.getJournalName(journalId)
                    }}</span>
            </div>
            <div>
                <div class="cursor-pointer rounded border-white border-2 py-1 px-1">
                    <span @click="createNewEntry('text')">New</span>
                </div>
            </div>
        </div>

        <Entry v-if="activeComponentView === 'entry'" :journal-id="journalId" :selected-entry="selectedEntry"
            @close-entry="closeEntry" @deleted-entry="closeEntry" @saved-entry="closeEntry"></Entry>
        <EntrySummary v-else-if="activeComponentView === 'summaries'"
            v-for="entry in store.getAllEntriesByJournalId(journalId)" :entry="entry" @select-entry="selectEntry">
        </EntrySummary>
    </div>
</template>