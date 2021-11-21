<template>
  <q-page>
    <q-resize-observer @resize="onResize"/>
    
    <div :style="style">
      <q-scroll-area style="width: 300px;" class="list-br">
        <q-list separator>
          <q-item clickable v-ripple @click="storySettingsDialog = true">
            <q-item-section>
              <q-item-label caption>{{ story.title }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="settings" color="grey" />
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-for="j in 30" :key="j"
            expand-separator
            :content-inset-level="0.5"
            :label="'Slide Title ' + j"
            default-closed>
            <q-item v-for="n in 4" :key="n" clickable v-ripple>
              <q-item-section>Layer Title {{n}}</q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <q-scroll-area style="flex: 1" class="list-br">
      </q-scroll-area>
      <q-scroll-area style="width: 300px;">
      </q-scroll-area>
    </div>

    <q-dialog v-model="storySettingsDialog">
      <q-card style="width: 600px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">Story Settings</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="story.title" label="Title" />
        </q-card-section>

        <q-item-label header>Text-to-Speech</q-item-label>
        <q-card-section>
          <q-select
            v-if="languageCodes"
            class="q-mb-md"
            style="width: 100%;"
            filled
            v-model="story.settings.voice.languageCode"
            :options="languageCodes"
            label="Language" />
          <q-select
            v-if="voiceNames"
            class="q-mb-md"
            style="width: 100%;"
            filled
            v-model="story.settings.voice.name"
            :options="voiceNames"
            label="Voice" />
          <div class="text-caption" style="width: 400px;">
            Speed: {{story.settings.audioConfig.speakingRate}}
          </div>
          <q-slider style="width: 100%;" v-model="story.settings.audioConfig.speakingRate" :min="0.25" :max="4" :step="0.01"/>
          <div class="text-caption" style="width: 100%;">
            Pitch: {{story.settings.audioConfig.pitch}}
          </div>
          <q-slider style="width: 100%;" v-model="story.settings.audioConfig.pitch" :min="-20" :max="20" :step="0.1"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  name: 'AdvancedEditor',
  data() {
    return {
      story: {
        title: "Story Title",
        settings: {
          voice: {
            languageCode: "de-DE",
            name: "de-DE-Wavenet-F"
          },
          audioConfig: {
            audioEncoding: "MP3",
            pitch: 0,
            speakingRate: 1
          }
        },
        slides: []
      },
      languageCodes: ["de-DE","us-US","fr-FR"],
      voiceNames: ["de-DE-Wavenet-F","Name 1", "Name 2"],
      storySettingsDialog: false,
      style: {
        display: 'flex',
        'align-items': 'stretch' 
      }
    }
  },
  mounted(){},
  computed: {},
  methods: {
    onResize (size) {
      this.style.height = size.height + 'px'
    },
  }
}
</script>
<style lang="scss" scoped>
.list-br {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
</style>