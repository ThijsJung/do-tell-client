<script lang="ts">
export default {
    data() {
        return {
            journals: [
                { id: 1, name: "Espanol", description: "Un sitio donde dejar todos mis pensamientos espanoles." },
                { id: 2, name: "Dreams", description: "An overview of my subconsciousness, as presented to me during the night time." }
            ]
        }
    }
}
</script>

<template>
    <div class="flex flex-col px-3 py-2">
        <JournalsList :journals="journals"></JournalsList>
    </div>
</template>
