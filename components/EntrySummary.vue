<script lang="ts">
export default {
    props: {
        entry: Object,
    },
    emits: ['selectEntry'],
    methods: {
        truncateContent(content: string) {
            let truncatedContent = content.slice(0, 80)
            if (content.length >= 80) {
                truncatedContent += '...'
            }
            return truncatedContent
        }
    }
}
</script>

<template>
    <article class="p-1 m-1 flex flex-col" @click="$emit('selectEntry', entry.id)">
        <div class=" flex justify-between">
            <div class="text-xl">
                <span v-if="entry.type == 'audio'" class="material-symbols-outlined align-middle">mic</span>
                <span v-if="entry.type == 'text'" class="material-symbols-outlined align-middle">draw</span>
                {{ entry.title }}
            </div>
            <div class="text-sm self-end">
                {{ entry.createdAt }}
            </div>
        </div>
        <div>
            {{ truncateContent(entry.content) }}
        </div>
    </article>
</template>