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
            selectedEntryId: '',
            selectedEntry: {},
            selectedEntryType: '',
            entries: [],

            showNewEntryOptions: false,
            activeComponentView: 'summaries'  // Enum: ['summaries', 'newEntry', 'entry']
        }
    },
    computed: {
        summariesViewIsActive() {
            return this.activeComponentView === 'summaries'
        }
    },
    methods: {
        cancelEditEntry() {
            this.activeComponentView = 'summaries'
        },
        createNewEntry(newEntryType: string) {
            this.showNewEntryOptions = false
            this.selectedEntryType = newEntryType
            this.selectedEntry = {}
            this.activeComponentView = 'entry'
        },
        selectEntry(entryId: string) {
            const entry = this.store.getEntryById(this.journalId, entryId)
            this.selectedEntry = entry
            this.selectedEntryType = entry.content.type
            this.showNewEntryOptions = false
            this.activeComponentView = 'entry'
        },
        closeEntry() {
            this.activeComponentView = 'summaries'
        },
        updateEntry(entryId: string){
            this.selectedEntryId = entryId
            this.activeComponentView = 'newEntry'

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
                <div class="cursor-pointer rounded border-white border-2 pl-2">
                    <span @click="createNewEntry('text')" class="pr-2">New<span
                            class="material-symbols-outlined align-middle pl-2">draw</span></span>
                    <span class="material-symbols-outlined align-middle border-l-2 ml-1 pr-1"
                        @click="showNewEntryOptions = !showNewEntryOptions">
                        expand_more
                    </span>
                </div>
                <div v-if="showNewEntryOptions" class="flex-col py-2">
                    <div @click="createNewEntry('text')"><span
                            class="material-symbols-outlined align-middle pr-2">draw</span>Text
                    </div>
                    <div @click="createNewEntry('audio')"><span
                            class="material-symbols-outlined align-middle pr-2">mic</span>Audio</div>
                    <div @click="createNewEntry('image')"><span
                            class="material-symbols-outlined align-middle pr-2">image</span>Image</div>
                </div>
            </div>
        </div>
        <!-- <Entry v-if="activeComponentView === 'entry'">

        </Entry> -->

        <Entry v-if="activeComponentView === 'entry'" :selected-entry="selectedEntry" :entry-type="selectedEntryType"
            @update-entry="updateEntry" @close-entry="closeEntry" @deleted-entry="closeEntry" @saved-entry="closeEntry"></Entry>
        <!-- <EntrySummary v-else v-for="entry in store.getAllEntriesByJournalId(journalId)" :entry="entry"></EntrySummary> -->
        <EntrySummary v-else-if="activeComponentView === 'summaries'" v-for="entry in store.getAllEntries[journalId]"
            :entry="entry" @select-entry="selectEntry">
        </EntrySummary>
    </div>
</template>