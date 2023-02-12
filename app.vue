<script lang="ts">
export default {
  data() {
    return {
      journals: [
        { name: "Espanol", description: "Un sitio done dejar todos mis pensamientos espanoles." },
        { name: "Dreams", description: "An overview of my subconsciousness, as presented to me during the night time." }
      ],
      demoModeOn: true
    }
  }
}
</script>

<template>
  <div class="max-w-lg">
    <header class="flex text-4xl p-2 text-sky-400">
      <div class="grow">Do tell</div><div v-if="demoModeOn" class="text-xs text-red-600">[DEMO MODE]</div>
    </header>
    <NuxtPage />
  </div>
</template>
