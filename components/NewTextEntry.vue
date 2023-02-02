<template>
    <div class="flex flex-col p-1 m-1">
        <div >
            <input class="w-full mb-1 border-none focus:outline-none bg-black text-white" type="text" placeholder="Untitled entry" autofocus>
        </div>
        <div>
            <textarea class="w-full h-80 border-none bg-black text-white" placeholder="Do tell..."></textarea>
        </div>
        <div class="flex justify-between pt-2">
            <NuxtLink to="/journal/1">
                <button class="cursor-pointer rounded border-white border-2 py-1 px-2">Cancel</button>
            </NuxtLink>
            <button class="cursor-pointer rounded border-white border-2 py-1 px-2">Save</button>
        </div>
    </div>
</template>