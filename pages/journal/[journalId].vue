<script lang="ts">
import { useJournalStore } from '@/stores/journals'

const allEntries = {
    "J-8cae": [
        { id: "E-ccc", type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
        { id: "E-ddd", type: "audio", createdAt: "01/01/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
        { id: "E-eee", type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
        { id: "E-fff", type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
        { id: "E-ggg", type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" }
    ],
    "J-6308": [
        { id: "E-ccc", type: "text", createdAt: "01/02/2023, 14:58", title: "The maze", content: "I'm walking through a maze. It's green and lush I'm certain I'm getting closer to the center. Somewhere in the distance I hear a bear roar." },
        { id: "E-ddd", type: "audio", createdAt: "01/01/2023, 14:58", title: "Murder baby", content: "It's coming for me, I know it!" }
    ]
}

export default {
    setup() {
        const store = useJournalStore()

        return { store }
    },
    created() {
        const journalId = this.$route.params.journalId
        for (const entry of allEntries[journalId]) {
            // console.log(entry, typeof entry)
            this.store.addEntry(journalId, entry)
        }
        this.journalId = journalId
    },
    data() {
        return {
            journalId: 'J-UnknownID',
            journalName: 'Espanol',
            entries: [],

            showNewEntryOptions: false,
            showNewEntry: false,
            newEntryType: '',

            selectedEntryId: '',
            activeComponentView: 'summaries'  // Enum: ['summaries', 'newEntry', 'entry']
        }
    },
    methods: {
        cancelEditEntry() {
            this.activeComponentView = 'summaries'
        },
        createNewEntry(newEntryType: string) {
            this.newEntryType = newEntryType
            this.activeComponentView = 'newEntry'
        },
        selectEntry(entryId: string) {
            this.selectedEntryId = entryId
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
                <NuxtLink class="underline" to="/">All journals</NuxtLink> > {{ journalName }}
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

        <Entry v-if="activeComponentView === 'entry'" :entryId="selectedEntryId" @close-entry="closeEntry"></Entry>

        <NewEntry v-else-if="activeComponentView === 'newEntry'" :new-entry-type="newEntryType"
            @cancel-edit-entry="cancelEditEntry">
        </NewEntry>
        <!-- <EntrySummary v-else v-for="entry in store.getAllEntriesByJournalId(journalId)" :entry="entry"></EntrySummary> -->
        <EntrySummary v-else-if="activeComponentView === 'summaries'" v-for="entry in store.getAllEntries[journalId]"
            :entry="entry" @select-entry="selectEntry">
        </EntrySummary>
    </div>
</template>