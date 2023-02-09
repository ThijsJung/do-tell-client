<script lang="ts">

export default {
    props: {
        content: Object,
        isEditViewActive: Boolean
    },
    emits: ['updatedContent'],
    data() {
        return {
            transcript: !this.content.transcript ? '' : this.content.transcript,
            isThisThingOn: false,
            audioSrc: new Blob()
        }
    },
    computed: {
        audioSrcIsAvailable() {
            console.log('Updated: audioSrc. Size: ', this.audioSrc.size)
            return this.audioSrc.size > 0
        }
    },
    methods: {
        updateContent(event) {
            const newContent = {
                type: 'audio',
                language: this.content.language,
                transcript: event.target.transcript
            }
            this.$emit('updatedContent', newContent)
        },
        startRecording() {
            const stopButton = document.getElementById('stop-button')
            const player = document.getElementById('player-new')
            this.isThisThingOn = true

            const handleSuccess = function (stream) {
                const options = { mimeType: 'audio/webm' };
                const recordedChunks = [];
                const mediaRecorder = new MediaRecorder(stream, options);

                mediaRecorder.addEventListener('dataavailable', function (e) {
                    if (e.data.size > 0) recordedChunks.push(e.data);
                });

                mediaRecorder.addEventListener('stop', function () {
                    const newAudioBlob = new Blob(recordedChunks)
                    player.src = URL.createObjectURL(newAudioBlob)
                });

                stopButton.addEventListener('click', function () {
                    mediaRecorder.stop()
                });

                mediaRecorder.start();
            };

            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(handleSuccess);
        }
    }
}

</script>

<template>
    <div>
        <div v-if="isEditViewActive" class="flex flex-col">
            <div class="flex m-5">
                <button id="start-button" :class="{ 'border-8' : isThisThingOn}" class="mx-2 border-red-600 rounded-full h-20 w-20 border-2"
                    @click="startRecording"><span class="material-symbols-outlined">
                        mic
                    </span></button>
                <div v-show="isThisThingOn">
                    <button id="stop-button" class="mx-2 border-sky-400 rounded-full h-20 w-20 border-2"><span
                            class="material-symbols-outlined">
                            stop
                        </span></button>
                </div>
            </div>
            <!-- v-if="audioSrcIsAvailable" -->
            <audio id="player-new" class="m-2 justify-center" controls></audio>
            <textarea v-model="transcript" class="w-full h-80 border-none bg-black text-white"
                placeholder="Do tell..."></textarea>
        </div>
        <div v-else>
            <audio id="player" class="m-2 justify-center"
                src="https://s3.eu-west-1.amazonaws.com/hungarian.phrasebook/tty-diary/thijstest_1657477079.mp3"
                controls></audio>
            <p class="py-1" v-for="paragraph in transcript.split('\n')">
                {{ paragraph }}</p>
        </div>
    </div>
</template>