<script lang="ts">
export default {
    props: {
        journalName: String,
        journalDescription: String,
        journalId: Number
    },
    emits: ['cancelEditJournal', 'saveJournal', 'deleteJournal'],
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
    <div class="flex flex-col p-1 m-1">
        <div>
            <input v-model="name" class="w-full mb-1 border-none focus:outline-none bg-black text-white" type="text"
                placeholder="Untitled journal" autofocus>
        </div>
        <div>
            <textarea v-model="description" class="w-full h-40 border-none bg-black text-white"
                placeholder="Short description..."></textarea>
        </div>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('cancelEditJournal')">Cancel</button>
            <button class="cursor-pointer rounded border-sky-400 text-sky-400 border-2 py-1 px-2"
                @click="$emit('saveJournal', name, description, id)">Save</button>
        </div>
    </div>
</template>