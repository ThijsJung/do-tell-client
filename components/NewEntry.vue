<script lang="ts">
export default {
    props: {
        journalName: String,
        journalDescription: String,
        journalId: Number
    },
    emits: ['cancelEditEntry'],
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
    <div class="flex flex-col px-3 py-2">
        <div class="flex flex-row">
            <div class="basis-3/4">
                <NuxtLink class="underline" to="/">All journals</NuxtLink> > ... > Untitled entry
            </div>
        </div>
        <NewTextEntry></NewTextEntry>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('cancelEditEntry')">Cancel</button>
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2">Save</button>
        </div>
    </div>
</template>