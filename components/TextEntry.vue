<script lang="ts">
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
        <div class="text-sm" >
            {{ entry.createdAt }}
        </div>
        <div>
            <!-- <p class="py-1" v-for="paragraph in entry.content.transcript.split('\n')">{{ paragraph }}</p> -->
            <p class="py-1">Text support coming soon!</p>
        </div>
    </article>
</template>