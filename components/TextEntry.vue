<script lang="ts">
import { epochToDateString } from '@/utils/utils'

export default {
    emits: ['updateEntry', 'toggleEditView'],
    props: {
        entry: Object,
        activateEditView: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isEditViewActive: this.activateEditView
        }
    },
    methods: {
        toggleEditView() {
            this.isEditViewActive = !this.isEditViewActive
            this.$emit('toggleEditView', this.isEditViewActive)
        }
    }
}
</script>

<template>
    <article class="p-1 m-1 flex flex-col">
        <div class="flex text-xl">
            <div>
                <span class="material-symbols-outlined align-middle">draw</span>
            </div>
            <div v-if="!isEditViewActive" class="grow">
                {{ entry.title }}
            </div>
            <div v-else class="grow">
                <input v-model="entry.title" class="w-full mb-1 border-none focus:outline-none bg-black text-white text-xl"
                    type="text" placeholder="Untitled entry" autofocus>
            </div>
            <div>
                <span class="material-symbols-outlined align-middle hover:bg-sky-200 cursor-pointer"
                    @click="toggleEditView">
                    edit
                </span>
            </div>
        </div>

        <div class="text-xs my-1">
            {{ epochToDateString(entry.createdAt) }}
        </div>
        <div v-if="!isEditViewActive">
            <p class="py-1" v-for="paragraph in entry.content.text.split('\n')">{{ paragraph }}</p>
        </div>
        <div v-else>
            <textarea v-model="entry.content.text" class="w-full h-80 border-none bg-black text-white"
                placeholder="Do tell..."></textarea>
        </div>
    </article>
</template>