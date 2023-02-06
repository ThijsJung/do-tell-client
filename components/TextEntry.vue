<script lang="ts">
import { epochToDateString } from '@/utils/utils'

export default {
    emits: ['updateEntry', 'toggleEditView'],
    props: {
        entry: {
            type: Object
        },
        // TODO: Seems the better way to go.
        // entryTitle: {
        //     type: String
        // },
        // entryDescription: {
        //     type: String
        // },
        activateEditView: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isEditViewActive: this.activateEditView,
            title: (this.checkIfObjectIsEmpty(this.entry)) ? '' : this.entry.title,
            description: (this.checkIfObjectIsEmpty(this.entry)) ? '' : this.entry.content.text
        }
    },
    methods: {
        toggleEditView() {
            this.isEditViewActive = !this.isEditViewActive
            this.$emit('toggleEditView', this.isEditViewActive)
        },
        checkIfObjectIsEmpty(obj) {
            // According to: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            return (// because Object.keys(new Date()).length === 0;
                // we have to do some additional check
                obj // 👈 null and undefined check
                && Object.keys(obj).length === 0
                && Object.getPrototypeOf(obj) === Object.prototype)
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
                {{ title }}
            </div>
            <div v-else class="grow">
                <input v-model="title" class="w-full mb-1 border-none focus:outline-none bg-black text-white text-xl"
                    type="text" placeholder="Untitled entry" autofocus>
            </div>
            <div v-if="!isEditViewActive">
                <span class="material-symbols-outlined align-middle hover:bg-sky-200 cursor-pointer"
                    @click="toggleEditView">
                    edit
                </span>
            </div>
        </div>

        <div v-if="!isEditViewActive" class="text-xs my-1">
            {{ epochToDateString(entry.createdAt) }}
        </div>
        <div v-if="!isEditViewActive">
            <p class="py-1" v-for="paragraph in description.split('\n')">{{ paragraph }}</p>
        </div>
        <div v-else>
            <textarea v-model="description" class="w-full h-80 border-none bg-black text-white"
                placeholder="Do tell..."></textarea>
        </div>
    </article>
</template>