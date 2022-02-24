<template>
    <q-card flat bordered class="q-mb-md">
        <q-card-section>
            <q-item dense class="q-pa-none">
                <q-item-section avatar>
                    <q-btn class="gt-xs" size="12px" flat dense round
                        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                        @click="expanded = !expanded"/>
                </q-item-section>
                <q-item-section>
                    <div class="text-h5 q-mb-xs cursor-pointer">
                        {{ title }}
                        <q-popup-edit v-model="title" auto-save v-slot="scope">
                            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                        </q-popup-edit>
                    </div>
                </q-item-section>
                <q-item-section side>
                    <div class="row q-gutter-x-sm q-pr-md">
                        <q-select
                            v-if="tts_settings.languageCodes"
                            filled dense style="width: 140px"
                            v-model="languageCodeEntry"
                            :options="tts_settings.languageCodes"
                            label="Language" />
                        <q-select
                            v-if="tts_settings.voiceNames"
                            filled dense style="width: 140px"
                            v-model="voiceNameEntry"
                            :options="filteredVoiceOptions"
                            label="Voice" />
                    </div>
                </q-item-section>
                <q-separator vertical/>
                <q-item-section side>
                    <div>
                        <q-btn flat dense round size="md" icon="volume_up" @click="GetPreview()"/>
                        <q-btn flat dense round size="md" icon="more_vert">
                            <q-menu>
                                <q-list>
                                    <q-item clickable v-close-popup @click="DeleteSelf()">
                                        <q-item-section side>
                                            <q-icon name="delete"/>
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Delete</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
        </q-card-section>
        <q-card-section v-if="src" class="q-pt-none">
            <audio controls ref="audioPreview" class="card-audio-preview" :title="title">
                <source :src="src" type="audio/mp3">
                <p>Audio Element not supported</p>
            </audio>
        </q-card-section>
        <q-linear-progress indeterminate :class="{invisible: !isLoading}"/>
        <q-slide-transition>
            <div v-show="expanded">
                <q-separator />
                <q-card-section class="q-pa-none">
                    <q-editor
                        class="ssml-editor"
                        ref="editorRef"
                        flat style="line-height: 2rem;"
                        content-class="bg-indigo-1"
                        v-model="input"
                        :definitions="definitions"
                        :toolbar="toolbar"
                        min-height="8rem">
                        <template v-slot:break>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Break"
                                dropdown-icon="pause">
                                <q-list>
                                    <q-item clickable>
                                        <q-item-section>200ms</q-item-section>
                                    </q-item>
                                    <q-item clickable>
                                        <q-item-section>400ms</q-item-section>
                                    </q-item>
                                    <q-item clickable>
                                        <q-item-section>1000ms</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </template>
                        <template v-slot:sayas>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Say As"
                                dropdown-icon="call_split"/>
                        </template>
                        <template v-slot:sub>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Substitute"
                                dropdown-icon="alt_route"/>
                        </template>
                        <template v-slot:prosody>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Prosody"
                                dropdown-icon="speed"/>
                        </template>
                        <template v-slot:emphasis>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Emphasis"
                                dropdown-icon="highlight"/>
                        </template>
                        <template v-slot:voice>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Voice"
                                dropdown-icon="record_voice_over"/>
                        </template>
                        <template v-slot:language>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Language"
                                dropdown-icon="translate">
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
                        <template v-slot:phoneme>
                            <q-btn-dropdown
                                unelevated dense no-caps
                                menu-anchor="top right" menu-self="top left"
                                text-color="primary" size="sm"
                                no-icon-animation
                                label="Phoneme"
                                dropdown-icon="rtt"/>
                        </template>
                    </q-editor>
                </q-card-section>
            </div>
        </q-slide-transition>
    </q-card>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { buildBody, generateTTS } from './tts/SSMLClient.js'
import tts_settings from './tts/DefaultSettings.js'

export default defineComponent({
  name: 'SSMLEditor',
  props: {
      entryID: {
          type: Number
      },
      entry: {
          type: Object,
      }
  },
  setup(props) {
      const store = useStore();

      const title = computed({
          get: () => store.getters['project/getEntryTitle'](props.entryID),
          set: val => store.commit('project/updateEntryTitle', {entryID: props.entryID, title: val})
      })

      const input = computed({
          get: () => store.getters['project/getEntryInput'](props.entryID),
          set: val => store.commit('project/updateEntryInput', {entryID: props.entryID, input: val})
      })

      const languageCodeEntry = computed({
          get: () => store.getters['project/getEntryLanguageCode'](props.entryID),
          set: val => store.commit('project/updateEntryLanguageCode', {entryID: props.entryID, languageCode: val})
      })

      const voiceNameEntry = computed({
          get: () => store.getters['project/getEntryVoiceName'](props.entryID),
          set: val => store.commit('project/updateEntryVoiceName', {entryID: props.entryID, name: val})
      })

      return {
          store,
          title,
          input,
          languageCodeEntry,
          voiceNameEntry
      }
  },
  data() {
      return {
            tts_settings,
            tts_language_selection: {
				"label": "German",
				"value": "de-DE"
			},
            tts_voice_selection: {
				"label": "Franziska",
				"value": "de-DE-Wavenet-F"
			},
            definitions: {},
            toolbar: [
                ['viewsource'],
                ['break'],
                ['sayas'],
                ['sub'],
                ['prosody'],
                ['emphasis'],
                ['voice'],
                ['language'],
                ['phoneme'],
            ],
            expanded: true,
            isLoading: false,
            src: null
      }
  },
  methods: {
    DeleteSelf(){
        this.store.commit('project/deleteEntry', this.$props.entryID);
    },
    GetPreview(){
        this.isLoading = true;

        let body = buildBody(this.input, { languageCode: this.languageCodeEntry, name: this.voiceNameEntry});

        generateTTS(body)
            .then((audioData) => {
                this.src = audioData.src;
                this.$refs.audioPreview.load();
                this.isLoading = false;
            })
            .catch((error) => {
                console.log("Error getting audio");
                this.isLoading = false;
            });
    }
  },
  computed: {
    filteredVoiceOptions() {
      return tts_settings.voiceNames.filter(item => {
        return item.value.includes(this.languageCodeEntry.value);
      })
    }
  }
})
</script>
<style lang="scss">
.card-audio-preview {
    width: 100%;
    height: 40px;
}
</style>