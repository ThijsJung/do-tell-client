<script lang="ts">
export default {
    props: {
        content: Object,
        isEditViewActive: Boolean
    },
    emits: ['updatedContent'],
    data() {
        return {
            text: !this.content.text ? '' : this.content.text
        }
    },
    methods: {
        updateContent(event) {
            const newContent = {
                type: 'text',
                language: this.content.language,
                text: event.target.value
            }
            this.$emit('updatedContent', newContent)
        }
    }
}
</script>

<template>
    <div>
        <div v-if="!isEditViewActive">
            <p class="py-1" v-for="paragraph in text.split('\n')">{{ paragraph }}</p>
        </div>
        <div v-else>
            <textarea @focusout="updateContent" v-model="text" class="w-full h-80 p-0 border-none bg-black text-white"
                placeholder="Do tell..."></textarea>
        </div>
    </div>
</template>