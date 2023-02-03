<script lang="ts">
export default {
    props: {
        newEntryType: String
    },
    emits: ['cancelEditEntry']
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <NewTextEntry v-if="newEntryType === 'text'"></NewTextEntry>
        <NewAudioEntry v-else-if="newEntryType === 'audio'"></NewAudioEntry>
        <NewImageEntry v-else-if="newEntryType === 'image'"></NewImageEntry>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('cancelEditEntry')">Cancel</button>
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2">Save</button>
        </div>
    </div>
</template>