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
    <div class="flex flex-col p-1 m-1">
        <div >
            <input class="w-full mb-1 border-none focus:outline-none bg-black text-white" type="text" placeholder="Untitled journal" autofocus>
        </div>
        <div>
            <textarea class="w-full h-40 border-none bg-black text-white" placeholder="Short description..."></textarea>
        </div>
        <div class="flex justify-between pt-2">
            <NuxtLink to="/">
                <button class="cursor-pointer rounded border-white border-2 py-1 px-2">Cancel</button>
            </NuxtLink>
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2">Save</button>
        </div>
    </div>
</template>