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
    <header>
      Do Tell
    </header>
    <div>
      <div>All journals</div>
      <div>New</div>
    </div>
    <article v-for="journal in journals">
      {{ journal.name }}
      {{ journal.description }}
      <div>Edit menu</div>
    </article>
  </div>
</template>
