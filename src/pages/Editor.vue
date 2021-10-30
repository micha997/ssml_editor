<template>
  <q-page class="flex fit row wrap justify-center">
    <div style="width: 300px" class="q-ma-xl">
      <q-btn-toggle
      v-model="ssmlActive"
      spread
      class="my-custom-toggle q-mb-md"
      style="width: 100%;"
      no-caps
      unelevated
      toggle-color="grey-3"
      color="white"
      text-color="black"
      toggle-text-color="black"
      :options="[
        {label: 'Text', value: false},
        {label: 'SSML', value: true}
      ]"/>
      <q-select
        v-if="languageSelection"
        class="q-mb-md"
        style="width: 100%;"
        filled
        v-model="languageSelected"
        :options="languageSelection"
        label="Language" />
      <q-select
        v-if="filteredVoices"
        class="q-mb-md"
        style="width: 100%;"
        filled
        v-model="voiceSelected"
        :options="filteredVoices"
        label="Voice" />
      <div class="text-caption" style="width: 400px;">
        Speed: {{speakingRate}}
      </div>
      <q-slider style="width: 100%;" v-model="speakingRate" :min="0.25" :max="4" :step="0.01"/>
      <div class="text-caption" style="width: 100%;">
        Pitch: {{pitch}}
      </div>
      <q-slider style="width: 100%;" v-model="pitch" :min="-20" :max="20" :step="0.1"/>
    </div>

    <div class="col-grow q-mt-xl">
      <q-input
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
    </div>

    <div style="width: 300px" class="q-ma-xl">
      <div class="text-subtitle1">TTS MP3</div>
      <div v-for="(item, index) in generatedTTS" :key="index" class="q-mt-md flex flex-center">
        <audio controls>
          <source :src="item" type="audio/mp3">
          <p>Audio Element not supported</p>
        </audio>
        <!--
        <q-btn
          class="q-ml-md"
          size="1.1rem"
          round
          unelevated
          color="grey-3"
          text-color="black"
          icon="download"/>
          -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

const TTS_URL = 'http://localhost:4000/tts';

export default defineComponent({
  name: 'PageEditor',
  data() {
    return {
      generatedTTS: [],

      text: '',
      ssmlActive: false,
      pitch: 0,
      speakingRate: 1,
      languageSelection: null,
      languageSelected: 'de-DE',
      voiceSelection: null,
      voiceSelected: ''
    }
  },
  mounted(){
    this.getVoices();
  },
  computed: {
    filteredVoices(){
      if(!this.voiceSelection) return;

      let filterByLanguage = this.voiceSelection.filter(entry => entry.name.includes(this.languageSelected));
      let filterByType = filterByLanguage.filter(entry => entry.name.includes('Wavenet'));

      let voiceOptions = [];
      filterByType.forEach(element => {
        voiceOptions.push(element.name);
      });
      return voiceOptions;
    }
  },
  methods: {
    getVoices(){
      this.$axios.get(TTS_URL+'/voices')
        .then((response) => {
          this.voiceSelection = response.data;

          let languages = [];

          // Separate Languages
          this.voiceSelection.forEach(element => {
            languages.push(element.languageCodes[0]);
          });

          this.languageSelection = languages.filter((v,i,a) => a.indexOf(v) === i);
          this.languageSelection.sort();
        });
    },
    generateTTS(){
      const requestBody = this.buildRequestBody();

      const requestConfig = {
        headers: { 'Content-type': 'application/json; charset=UTF-8'}
      }

      this.$axios.post(
        TTS_URL,
        requestBody,
        requestConfig)
        .then((response) => {
          this.generatedTTS.push("data:audio/mpeg;base64," + response.data);
        });
    },
    buildRequestBody(){
      let input;

      // Prepare input
      if(this.ssmlActive){
        input = { ssml: this.text }
      }else{
        input = { text: this.text }
      }

      return {
        input,
        voice: {
          languageCode: this.languageSelected,
          name: this.voiceSelected
        },
        audioConfig: {
          audioEncoding: "MP3",
          pitch: this.pitch,
          speakingRate: this.speakingRate
        }
      }
    }
  }
})
</script>
<style lang="scss" scoped>
  .my-custom-toggle {
    border: 1px solid #eeeeee;
  }
</style>