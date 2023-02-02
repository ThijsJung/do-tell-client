<script lang="ts">
export default {
    props: {
        journalName: String,
        journalDescription: String,
        journalId: Number
    },
    emits: ['updateJournal'],
    data() {
        return {
            name: this.journalName,
            description: this.journalDescription,
            id: this.journalId
        }
    }
}
</script>

<template>
    <article class="p-1 m-1 flex flex-col">
        <div class="flex">
            <div class="text-xl grow" @click="$router.push(`/journal/${id}`)">
                {{ name }}
            </div>
            <span class="material-symbols-outlined w-8 h-8 hover:bg-sky-200 cursor-pointer"
                @click="$emit('updateJournal', name, description, id)">
                edit
            </span>
        </div>
        <div @click="$router.push(`/journal/${id}`)">
            {{ description }}
        </div>
    </article>
</template>