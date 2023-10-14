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
            audioRecorder: null
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
        stopRecording() {
            console.log(this.audioRecorder.state)
            if (this.audioRecorder.state !== 'inactive') {
                this.audioRecorder.stop()
                this.isThisThingOn = false
                console.log(this.audioRecorder.state)
                console.log("recorder stopped")
            }
        },
        startRecording() {
            const previousAudioPlayer = document.getElementById('audio-player')
            if (previousAudioPlayer !== null) {
                previousAudioPlayer.remove()
            }
            if (navigator.mediaDevices) {
                console.log("getUserMedia supported.");

                const constraints = { audio: true };
                let chunks = [];
                var device = navigator.mediaDevices.getUserMedia(constraints)
                device.then((stream) => {
                    this.audioRecorder = new MediaRecorder(stream)
                    console.log('startRecording, recorder.state', this.audioRecorder.state)

                    this.audioRecorder.onstop = (e) => {
                        console.log("data available after audioRecorder.stop() called.")

                        const audio = document.createElement("audio")
                        audio.setAttribute("controls", "")
                        audio.id = "audio-player"
                        const audioPlayerContainer = document.getElementById('audio-player-container')

                        audioPlayerContainer.appendChild(audio)

                        audio.controls = true
                        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
                        chunks = []
                        const audioURL = URL.createObjectURL(blob)
                        audio.src = audioURL
                        console.log("recorder stopped")
                    }
                    this.audioRecorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                    };
                    this.audioRecorder.start();
                    this.isThisThingOn = true
                    console.log('startRecording, recorder.state', this.audioRecorder.state)
                }).catch((err) => {
                    console.error(`The following error occurred: ${err}`);
                    this.isThisThingOn = false
                })
            }
        }
    }
}
</script>

<template>
    <div>
        <div v-if="isEditViewActive" class="flex flex-col">
            <!-- <div class="flex m-5">
                <button id="start-button" :class="{ 'bg-red-600': isThisThingOn }"
                    class="mx-2 border-red-600 rounded-full h-20 w-20 border-4" @click="startRecording"><span
                        class="material-symbols-outlined">
                        mic
                    </span></button>
                <div v-show="isThisThingOn">
                    <button id="stop-button" @click="stopRecording"
                        class="mx-2 border-sky-400 rounded-full h-10 w-10 align-middle border-2"><span
                            class="material-symbols-outlined">
                            stop
                        </span></button>
                </div>
            </div>
            <div id="audio-player-container"></div> -->
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