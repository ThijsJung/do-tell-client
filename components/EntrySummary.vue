<script lang="ts">

import { epochToDateString } from '@/utils/utils'

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
        <div class="text-xl">
            <span v-if="entry.content.type === 'audio'" class="material-symbols-outlined align-middle">mic</span>
            <span v-if="entry.content.type === 'text'" class="material-symbols-outlined align-middle">draw</span>
            {{ entry.title }}
        </div>
        <div class="text-xs my-1">
            {{ epochToDateString(entry.createdAt) }}
        </div>

        <!-- TODO: Find a nicer way to display different types of summaries -->
        <div v-if="entry.content.type === 'audio' && 'transcript' in entry.content">
            {{ truncateContent(entry.content.transcript) }}
        </div>
        <div v-else-if="entry.content.type === 'text'">
            {{ truncateContent(entry.content.text) }}
        </div>
    </article>
</template>