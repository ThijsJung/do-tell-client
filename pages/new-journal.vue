<script lang="ts">
export default {
    data() {
        return {
            name: "",
            description: ""
        }
    }
}
</script>

<template>
    <div class="flex flex-col text-sky-400">
        <input type="text" placeholder="Untitled journal">
        <input type="textarea" placeholder="Short description">
        <div class="flex justify-between p-2">
            <NuxtLink to="/">
                <button class="cursor-pointer rounded border-white border-2 px-2">Cancel</button>
            </NuxtLink>
            <button class="cursor-pointer rounded border-white border-2 px-2">Save</button>
        </div>
    </div>
</template>