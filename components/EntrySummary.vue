<script lang="ts">
export default {
    props: {
        entry: Object,
    },
    emits: ['updateJournal'],
    // data() {
    //     return {
    //     }
    // }
}
</script>

<template>
    <article class="p-1 m-1 flex flex-col" @click="$router.push(`/journals/entries/${entry.id}`)">
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
            {{ entry.content }}
        </div>
    </article>
</template>