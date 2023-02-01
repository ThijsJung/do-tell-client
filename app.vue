<script lang="ts">
export default {
  data() {
    return {
      journals: [
        { name: "Espanol", description: "Un sitio done dejar todos mis pensamientos espanoles." },
        { name: "Dreams", description: "An overview of my subconsciousness, as presented to me during the night time." }
      ]
    }
  }
}
</script>

<template>
  <div class="bg-black text-white">
    <header class="text-2xl p-3">
      Do Tell
    </header>
    <div class="flex px-3 py-2">
      <div class="grow">All journals</div>
      <div>
        <button class="w-20 h-8 hover:bg-sky-200 cursor-pointer">
          <span class="material-symbols-outlined align-middle">
            add
          </span>New
        </button>
      </div>
    </div>
    <article class="p-3 m-2 flex flex-col " v-for="journal in journals">
      <div class="flex">
        <div class="text-xl grow">
          {{ journal.name }}
        </div>
        <div>
          <span class="material-symbols-outlined w-8 h-8 hover:bg-sky-200 cursor-pointer">
            more_vert
          </span>
        </div>
      </div>
      <div>
        {{ journal.description }}
      </div>
    </article>
  </div>
</template>
