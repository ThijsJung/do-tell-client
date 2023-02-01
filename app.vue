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
  <div>
    <header class="text-4xl p-3">
      Do Tell
    </header>
    <NuxtPage />
  </div>
</template>
