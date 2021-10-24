<template>
  <q-page class="flex flex-center column">
    <q-input
      style="width: 400px;"
      v-model="text"
      outlined
      label="SSML Text"
      type="textarea"
      />
    <q-btn
      class="q-mt-md"
      color="white"
      text-color="black"
      label="Submit"
      @click="generateTTS()"/>
    <div v-if="audioSrc" class="q-mt-md flex flex-center">
      <audio controls>
        <source :src="audioSrc" type="audio/mp3">
        <p>Audio Element not supported</p>
      </audio>
      <q-btn
        class="q-ml-md"
        size="1.1rem"
        round
        unelevated
        color="grey-3"
        text-color="black"
        icon="download"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageEditor',
  data() {
    return {
      text: '',
      audioSrc: null
    }
  },
  methods: {
    changeText(){
      this.$axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          this.text = response.data.body;
          this.audioSrc = 'https://developers.google.com/assistant/downloads/ssml/wavenet-speak.mp3?authuser=2';
        });
    },
    generateTTS(){
      const requestBody = {
        title: 'TTS',
        body: this.text,
        userId: 1,
      }

      const requestConfig = {
        headers: { 'Content-type': 'application/json; charset=UTF-8'}
      }

      this.$axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        requestBody,
        requestConfig)
        .then((response) => {
          this.audioSrc = 'https://developers.google.com/assistant/downloads/ssml/wavenet-speak.mp3?authuser=2';
        });
    }
  }
})
</script>
