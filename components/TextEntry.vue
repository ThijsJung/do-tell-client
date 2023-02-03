<script lang="ts">
import { epochToDateString } from '@/utils/utils'

export default {
    props: {
        entry: Object,
    }
}
</script>

<template>
    <article class="p-1 m-1 flex flex-col">
        <div class="text-xl">
            <span v-if="entry.content.type == 'text'" class="material-symbols-outlined align-middle">draw</span>
            {{ entry.title }}
        </div>
        <div class="text-sm my-1">
            {{ epochToDateString(entry.createdAt) }}
        </div>
        <div>
            <p class="py-1" v-for="paragraph in entry.content.text.split('\n')">{{ paragraph }}</p>
        </div>
    </article>
</template>