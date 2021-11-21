<template>
  <q-page class="fit row wrap justify-center">
    <div style="width: 200px" class="q-mt-xl q-ml-xl">
      <div class="text-h6">TTS Settings</div>
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

    <q-separator vertical inset class="q-mx-md"/>

    <div class="col-grow q-mt-xl">
      <div v-if="ssmlActive" class="text-h6">SSML Input</div>
      <div v-else class="text-h6">Text Input</div>
      <div class="row q-gutter-x-sm">
        <div class="col">
          <q-input
            v-model="editor"
            outlined
            type="textarea"
            />
            <q-editor
              ref="editorRef"
              class="q-mt-md"
              v-model="editor"
              :definitions="definitions"
              :toolbar="toolbar"
              toolbar-rounded
              min-height="20rem">
              <template v-slot:break>
                <q-btn-dropdown
                  unelevated
                  dense
                  rounded
                  menu-anchor="top right"
                  menu-self="top left"
                  color="white"
                  text-color="primary"
                  no-icon-animation
                  dropdown-icon="pause"
                  size="md"
                >
                  <q-list>
                    <q-item clickable @click="addBreak(250)">
                      <q-item-section>200ms</q-item-section>
                    </q-item>
                    <q-item clickable @click="addBreak(500)">
                      <q-item-section>400ms</q-item-section>
                    </q-item>
                    <q-item clickable @click="addBreak(1000)">
                      <q-item-section>1000ms</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
              <template v-slot:language>
                <q-btn-dropdown
                  unelevated
                  dense
                  rounded
                  menu-anchor="top right"
                  menu-self="top left"
                  color="white"
                  text-color="primary"
                  no-icon-animation
                  dropdown-icon="translate"
                  size="md"
                >
                  <q-list>
                    <q-item clickable>
                      <q-item-section>German</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>English</q-item-section>
                    </q-item>
                    <q-item clickable >
                      <q-item-section>French</q-item-section>
                    </q-item>
                    <q-item clickable >
                      <q-item-section>Russian</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-editor>
            <q-btn
              class="q-mt-md"
              color="white"
              text-color="black"
              label="Generate"
              @click="generateTTS()"/>
        </div>
        <!--
        <div class="col">
          <div class="row wrap justify-center q-gutter-x-sm">
            <div class="column inline wrap content-start q-gutter-y-sm">
              <q-btn round color="primary" icon="pause" />
              <q-btn round color="primary" icon="equalizer" />
              <q-btn round color="primary" icon="rtt" />
            </div>
            <q-list bordered separator class="col-grow">
              <q-item>
                <q-item-section side>
                  <q-icon color="primary" name="pause">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Pause
                    </q-tooltip>
                  </q-icon>
                </q-item-section>

                <q-item-section>
                  <q-slider
                    :min="0"
                    :max="10"
                    label
                    color="primary"
                  />
                </q-item-section>

                <q-item-section side>
                  <q-btn flat round color="grey-5" icon="cancel" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section side>
                  <q-icon color="primary" name="equalizer">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Emphasis
                    </q-tooltip>
                  </q-icon>
                </q-item-section>

                <q-item-section class="q-gutter-y-sm">
                  <q-select filled dense label="Type" />
                  <q-input outlined dense label="Text" />
                </q-item-section>

                <q-item-section side>
                  <q-btn flat round color="grey-5" icon="cancel" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section side>
                  <q-icon color="primary" name="rtt">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Say as
                    </q-tooltip>
                  </q-icon>
                </q-item-section>

                <q-item-section class="q-gutter-y-sm">
                  <q-select filled dense label="Type" />
                  <q-input outlined dense label="Text" />
                </q-item-section>

                <q-item-section side>
                  <q-btn flat round color="grey-5" icon="cancel" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        -->
      </div>
    </div>


    <q-separator vertical inset class="q-mx-md"/>

    <div style="width: 400px" class="q-mt-xl q-mr-xl">
      <div class="flex fit column">
        <div class="text-h6">MP3 Output</div>
        <q-scroll-area class="col-grow">
        <div v-for="(item, index) in generatedTTS" :key="index" class="q-mb-md q-pr-md">
          <q-card flat class="audio-card">
            <q-card-section>
              <div class="text-caption">
                {{ item.text }}
              </div>
            </q-card-section>
            <q-card-section>
              <audio controls style="width: 100%">
                <source :src="item.src" type="audio/mp3">
                <p>Audio Element not supported</p>
              </audio>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
const TTS_URL = 'http://localhost:4000/tts';

export default {
  name: 'PageEditor',
  data() {
    return {
      generatedTTS: [],

      ssmlActive: true,
      pitch: 0,
      speakingRate: 1,
      languageSelection: null,
      languageSelected: 'en-US',
      voiceSelection: null,
      voiceSelected: 'en-US-Wavenet-F',

      editor: 'Hello There',
      definitions: {},
      toolbar: [
        ['break', 'language']
      ]
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
          this.generatedTTS.push(
            {
              text: this.editor.replace(/<\/?[^>]+(>|$)/g, ""),
              src: "data:audio/mpeg;base64," + response.data
            }
          );
        });
    },
    buildRequestBody(){
      let inputStart = "<speak>";
      let inputEnd = "</speak>";
      let input, ssmlInput;

      // Prepare input
      if(this.ssmlActive){
        ssmlInput = inputStart.concat(this.editor);
        ssmlInput = ssmlInput.concat(inputEnd);
        ssmlInput = ssmlInput.replaceAll("&nbsp;", " ");
        input = { ssml: ssmlInput }
      }else{
        input = { text: this.editor.replace(/<\/?[^>]+(>|$)/g, "") }
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
    },
    addBreak(amount){
      const edit = this.$refs.editorRef;
      edit.caret.restore();
      edit.runCmd('insertHTML', ` <break time="` + amount + `ms"/> `);
      edit.focus();
      this.editor = this.editor.replaceAll("&nbsp;", " ");
    }
  }
}
</script>
<style lang="scss" scoped>
  .my-custom-toggle {
    border: 1px solid #eeeeee;
  }
  .audio-card {
    border: 1px solid #eeeeee;
  }
</style>