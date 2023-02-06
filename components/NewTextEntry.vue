<script lang="ts">
export default {
    props: {
        entryTitle: {
            type: String,
            default: ''
        },
        entryDescription: {
            type: String,
            default: ''
        },
        entryId: {
            type: String,
            default: 'newEntryId'
        }
    },
    emits: ['cancelEditEntry', 'saveEntry', 'deleteEntry'],
    data() {
        return {
            id: this.entryId,
            title: this.entryTitle,
            description: this.entryDescription
        }
    },
    methods: {
        saveEntry(title: string, description: string) {
            if (description === '') {
                description = 'Do tell...'
            }
            if (title === '') {
                title = 'Untitled entry'
            }
            const content = {
                "type": 'text',
                "language": "en_US",
                "text": description
            }
            this.$emit('saveEntry', this.entryId, title, content)
        }
    }
}
</script>

<template>
    <div class="flex flex-col p-1 m-1">
        <div>
            <input v-model="title" class="w-full mb-1 border-none focus:outline-none bg-black text-white" type="text"
                placeholder="Untitled entry" autofocus>
        </div>
        <div>
            <textarea v-model="description" class="w-full h-80 border-none bg-black text-white"
                placeholder="Do tell..."></textarea>
        </div>
        <div class="flex justify-between pt-2">
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="$emit('cancelEditEntry')">Cancel</button>
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2"
                @click="saveEntry(title, description)">Save</button>
        </div>
    </div>
</template>