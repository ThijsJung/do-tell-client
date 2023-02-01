<script lang="ts">
export default {
    data() {
        return {
            journal:
                { id: 1, name: "Espanol", description: "Un sitio done dejar todos mis pensamientos espanoles." },
            entries: [
                { id: 1, type: "text", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 2, type: "audio", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 3, type: "text", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 4, type: "text", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" },
                { id: 5, type: "text", title: "Hoy en dia", content: "No vas a creer lo que me ha pasado hoy... Caminando por la calle un chico me hacia parar para preguntarme" }
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
                <button class="cursor-pointer rounded border-white border-2 px-1" @click="showNew = !showNew">
                    New
                    <span class="material-symbols-outlined align-middle">
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

        <article class="p-3 m-2 flex flex-col " v-for="entry in entries">
            <div class="flex">
                <div class="text-2xl grow">
                    <span v-if="entry.type=='audio'" class="material-symbols-outlined align-middle pr-1">mic</span>
                    <span v-if="entry.type=='text'" class="material-symbols-outlined align-middle pr-1">draw</span>
                    {{ entry.title }}
                </div>
                <div v-if="showEdit" class="flex-col">
                    <div>Edit</div>
                    <div>Delete</div>
                </div>
                <div @click="showEdit = !showEdit">
                    <span class="material-symbols-outlined w-8 h-8 hover:bg-sky-200 cursor-pointer">
                        more_vert
                    </span>
                </div>
            </div>
            <div>
                {{ entry.content }}
            </div>
        </article>
        <p>{{ $route.params }}</p>
    </div>
</template>