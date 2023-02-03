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
            <span v-if="entry.content.type == 'audio'" class="material-symbols-outlined align-middle">mic</span>
            {{ entry.title }}
        </div>
        <div class="text-sm">{{ entry.createdAt }}</div>
        <audio class="m-3 justify-center" src="https://s3.eu-west-1.amazonaws.com/hungarian.phrasebook/tty-diary/thijstest_1657477079.mp3" controls></audio>
        <div>
            <p class="py-1" v-for="paragraph in entry.content.transcript.split('\n')">{{ paragraph }}</p>
        </div>
    </article>
</template>