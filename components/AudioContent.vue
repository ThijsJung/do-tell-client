<script lang="ts">
export default {
    props: {
        content: Object,
        isEditViewActive: Boolean
    },
    emits: ['updatedContent'],
    data() {
        return {
            transcript: !this.content.transcript ? '' : this.content.transcript
        }
    },
    methods: {
        updateContent(event) {
            const newContent = {
                type: 'audio',
                language: this.content.language,
                transcript: event.target.transcript
            }
            this.$emit('updatedContent', newContent)
        }
    }
}
</script>

<template>
    <div>
        <div v-if="isEditViewActive">
            <div>AUDIO RECORDER. FINALLY</div>
            <textarea v-model="transcript" class="w-full h-80 border-none bg-black text-white"
                placeholder="Do tell..."></textarea>
        </div>
        <div v-else>
            <audio class="m-2 justify-center"
                src="https://s3.eu-west-1.amazonaws.com/hungarian.phrasebook/tty-diary/thijstest_1657477079.mp3"
                controls></audio>
            <p class="py-1" v-for="paragraph in transcript.split('\n')">
                {{ paragraph }}</p>
        </div>
    </div>
</template>