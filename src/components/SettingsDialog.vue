<template>
  <q-btn flat round dense class="q-mr-sm" icon="settings" @click="visible = true"/>

  <!--TTS Settings Dialog-->
  <q-dialog v-model="visible">
    <q-card style="width: 600px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Project Settings</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="projectTitle" label="Title" />
      </q-card-section>

      <q-item-label header>Text-to-Speech</q-item-label>
      <q-card-section>
        <q-select
          v-if="tts_settings.languageCodes"
          class="q-mb-md"
          style="width: 100%;"
          filled
          v-model="languageCode"
          :options="tts_settings.languageCodes"
          label="Language" />
        <q-select
          v-if="tts_settings.voiceNames"
          class="q-mb-md"
          style="width: 100%;"
          filled
          v-model="voiceName"
          :options="tts_settings.voiceNames"
          label="Voice" />

        <!--
        <div class="text-caption" style="width: 400px;">
          Speed: {{story.tts_settings.audioConfig.speakingRate}}
        </div>
        <q-slider
          style="width: 100%;"
          v-model="story.tts_settings.audioConfig.speakingRate"
          :min="0.25" :max="4" :step="0.01"/>
        <div class="text-caption" style="width: 100%;">
          Pitch: {{story.tts_settings.audioConfig.pitch}}
        </div>
        <q-slider
          style="width: 100%;"
          v-model="story.tts_settings.audioConfig.pitch"
          :min="-20" :max="20" :step="0.1"/>
          -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import story from '../components/StoryPlaceholder.js'
import tts_settings from '../components/TTSSettingsPlaceholder.js'

export default defineComponent({
  name: 'SettingsDialog',
  setup() {
    const store = useStore();

    const projectTitle = computed({
      get: () => store.state.project.title,
      set: val => store.commit('project/updateTitle', val)
    });

    const languageCode = computed({
      get: () => store.state.project.tts_settings.voice.languageCode,
      set: val => store.commit('project/updateProjectLanguageCode', val)
    });

    const voiceName = computed({
      get: () => store.state.project.tts_settings.voice.name,
      set: val => store.commit('project/updateProjectVoiceName', val)
    });

    return {
      projectTitle,
      languageCode,
      voiceName
    }
  },
  data(){
    return{
      visible: false,
      story,
      tts_settings
    }
  }
})
</script>