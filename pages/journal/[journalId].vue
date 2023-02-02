<script lang="ts">
export default {
    data() {
        return {
            journal:
                { id: 1, name: "Espanol", description: "Un sitio done dejar todos mis pensamientos espanoles." },
            entries: [
                { id: 1, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 2, type: "audio", createdAt: "01/01/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 3, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 4, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 5, type: "text", createdAt: "01/02/2023, 14:58", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" }
            ],
            showEdit: false,
            showNew: false
        }
    }
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <div class="flex flex-row">
            <div class="basis-3/4">
                <NuxtLink class="underline" to="/">All journals</NuxtLink> > {{ journal.name }}
            </div>
            <div>
                <button class="cursor-pointer rounded border-white border-2 pl-2">
                    New
                    <span class="material-symbols-outlined align-middle border-l-2 ml-1 pr-1" @click="showNew = !showNew">
                        expand_more
                    </span>
                </button>
                <div v-if="showNew" class="flex-col">
                    <div><span class="material-symbols-outlined align-middle pr-2">draw</span>Text</div>
                    <div><span class="material-symbols-outlined align-middle pr-2">mic</span>Audio</div>
                    <div><span class="material-symbols-outlined align-middle pr-2">image</span>Image</div>
                </div>
            </div>
        </div>

        <article class="p-1 m-1 flex flex-col" v-for="entry in entries">
            <div class="flex justify-between">
                <div class="text-2xl">
                    <span v-if="entry.type=='audio'" class="material-symbols-outlined align-middle">mic</span>
                    <span v-if="entry.type=='text'" class="material-symbols-outlined align-middle">draw</span>
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
    </div>
</template>