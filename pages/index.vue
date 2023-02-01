<script lang="ts">
export default {
    data() {
        return {
            journals: [
                { id: 1, name: "Espanol", description: "Un sitio done dejar todos mis pensamientos espanoles." },
                { id: 2, name: "Dreams", description: "An overview of my subconsciousness, as presented to me during the night time." }
            ]
        }
    }
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <div class="flex flex-row">
            <div class="basis-4/5">All journals</div>
            <div>
                <NuxtLink to="/new-journal">
                    <button class="cursor-pointer rounded border-white border-2 px-2">New</button>
                </NuxtLink>
            </div>
        </div>
        <article class="p-3 m-2 flex flex-col " v-for="journal in journals">
            <div class="flex">
                <div class="text-xl grow" @click="$router.push(`/journal/${journal.id}`)">
                    {{ journal.name }}
                </div>
                <NuxtLink to="/new-journal">
                    <span class="material-symbols-outlined w-8 h-8 hover:bg-sky-200 cursor-pointer">
                        edit
                    </span>
                </NuxtLink>
            </div>
            <div @click="$router.push(`/journal/${journal.id}`)">
                {{ journal.description }}
            </div>
        </article>
    </div>
</template>
