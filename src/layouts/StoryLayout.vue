<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round
          icon="menu" aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-toolbar-title>
          {{story.title}}
        </q-toolbar-title>
        <q-space ></q-space>
        <q-btn-dropdown flat round dense no-icon-animation icon="source" class="q-mr-xs">
            <q-list>
                <q-item clickable v-close-popup @click="storyUploadDialog = true">
                    <q-item-section side>
                        <q-icon name="file_upload"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Story Upload</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="StoryDownload()">
                    <q-item-section side>
                        <q-icon name="file_download"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Story Download</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>
        <q-btn flat round dense icon="settings" class="q-mr-xs" @click="storySettingsDialog = true"/>
        <q-btn flat dense round
          icon="volume_up" aria-label="Audio Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"/>
      </q-toolbar>
    </q-header>

    <!--TTS Settings Dialog-->
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
            v-if="tts_settings.languageCodes"
            class="q-mb-md"
            style="width: 100%;"
            filled
            v-model="story.tts_settings.voice.languageCode"
            :options="tts_settings.languageCodes"
            label="Language" />
          <q-select
            v-if="tts_settings.languageCodes"
            class="q-mb-md"
            style="width: 100%;"
            filled
            v-model="story.tts_settings.voice.name"
            :options="tts_settings.languageCodes"
            label="Voice" />
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
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--Upload Dialog-->
    <q-dialog v-model="storyUploadDialog">
      <q-card style="width: 600px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">Story Upload</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-file outlined clearable v-model="storyUploadPath" accept=".json, application/json">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Upload" v-close-popup @click="StoryUpload()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered>
        <q-list>
            <q-expansion-item
            v-for="(slide, i) in story.slides" :key="i"
            :expand-icon-class="(slide.layers.length > 0) ? '' : 'hidden'"
            :content-inset-level="0.5"
            :label="slide.title"
            default-closed>
            <q-item v-for="(layer, j) in slide.layers" :key="j" clickable v-ripple>
                <q-item-section>{{ layer.title }}</q-item-section>
            </q-item>
            </q-expansion-item>
        </q-list>
    </q-drawer>

    <q-drawer
        v-model="rightDrawerOpen"
        show-if-above
        side="right"
        bordered width="400">
        <q-card flat>
            <q-card-section>
                <q-btn color="primary" text-color="white" label="Download All" class="full-width" />
            </q-card-section>
        </q-card>
        <q-separator></q-separator>
        <q-card v-for="n in 10" :key="n" flat class="audio-card">
            <q-card-section>
                <div class="text-caption">
                MP3 {{n}}
                </div>
            </q-card-section>
            <q-card-section>
                <audio controls style="width: 100%">
                <source type="audio/mp3">
                <p>Audio Element not supported</p>
                </audio>
            </q-card-section>
        </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import story from '../components/StoryPlaceholder.js'
import tts_settings from '../components/TTSSettingsPlaceholder.js'

export default defineComponent({
  name: 'StoryLayout',
  data() {
      return {
            story: story,
            storyUploadPath: null,
            tts_settings,
            leftDrawerOpen: false,
            rightDrawerOpen: false,
            storyUploadDialog: false,
            storySettingsDialog: false
      }
  },
  methods: {
      StoryUpload(){
          console.log(this.storyUploadPath);
      },
      StoryDownload(){
          console.log(this.story);
      }
  }
})
</script>
