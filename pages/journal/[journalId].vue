<script lang="ts">
export default {
    mounted() {
        this.journalId = this.$route.params.journalId
        this.entries = this.allEntries[this.journalId]
    },
    data() {
        return {
            journalId: 0,
            journalName: "Espanol",
            entries: [],
            allEntries: {
                1: [
                    { id: 1, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                    { id: 2, type: "audio", createdAt: "01/01/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                    { id: 3, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                    { id: 4, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                    { id: 5, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" }
                ],
                2: [
                    { id: 1, type: "text", createdAt: "01/02/2023, 14:58", title: "The maze", content: "I'm walking through a maze. It's green and lush I'm certain I'm getting closer to the center. Somewhere in the distance I hear a bear roar." },
                    { id: 2, type: "audio", createdAt: "01/01/2023, 14:58", title: "Murder baby", content: "It's coming for me, I know it!" }
                ]
            },
            showEdit: false,
            showNewEntryOptions: false,
            showNewEntry: false
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
                    <span @click="showNewEntry = true" class="pr-2">New<span
                            class="material-symbols-outlined align-middle pl-2">draw</span></span>
                    <span class="material-symbols-outlined align-middle border-l-2 ml-1 pr-1"
                        @click="showNewEntryOptions = !showNewEntryOptions">
                        expand_more
                    </span>
                </div>
                <div v-if="showNewEntryOptions" class="flex-col py-2">
                    <div><span class="material-symbols-outlined align-middle pr-2"
                            @click="showNewEntry = true">draw</span>Text
                    </div>
                    <div><span class="material-symbols-outlined align-middle pr-2">mic</span>Audio</div>
                    <div><span class="material-symbols-outlined align-middle pr-2">image</span>Image</div>
                </div>
            </div>
        </div>

        <NewEntry v-if="showNewEntry" @cancel-edit-entry="showNewEntry = false"></NewEntry>
        <EntrySummary v-else v-for="entry in entries" :entry="entry"></EntrySummary>
    </div>
</template>