<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round
          icon="menu" aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-toolbar-title class="cursor-pointer">
          {{story.title}}
          <q-popup-edit v-model="story.title" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-toolbar-title>
        <q-space ></q-space>
        <!--SSML Help Dialog-->
        <SSMLHelpDialog/>
        <q-separator dark vertical/>
        <ImportExportDialog/>

        <q-btn flat round dense class="q-mr-sm" icon="settings" @click="storySettingsDialog = true"/>
        <q-separator dark vertical/>
        <q-btn flat dense round class="q-ml-sm"
          icon="volume_up" aria-label="Audio Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"/>
      </q-toolbar>
    </q-header>

    <!--TTS Settings Dialog-->
    <q-dialog v-model="storySettingsDialog">
      <q-card style="width: 600px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Project Settings</div>
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
            v-if="tts_settings.voiceNames"
            class="q-mb-md"
            style="width: 100%;"
            filled
            v-model="story.tts_settings.voice.name"
            :options="tts_settings.voiceNames"
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered :width="400">
        <q-list>
          <!--GROUP-->
          <q-expansion-item
            v-for="(group, i) in story.groups" :key="i"
            :group="story.title"
            expand-icon-toggle
            :expand-icon-class="group.slides.length > 0 ? '' : 'hidden'"
            :content-inset-level="0.5"
            default-closed>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon size="sm" flat round name="folder" color="primary"/>
              </q-item-section>
              <q-item-section>
                {{ group.title }}
              </q-item-section>
              <q-menu context-menu>
                <q-list>
                  <q-item clickable>
                      <q-item-section side>
                          <q-icon name="edit"/>
                      </q-item-section>
                      <q-item-section>
                          <q-item-label>Edit Title</q-item-label>
                      </q-item-section>
                      <q-popup-edit v-model="group.title" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                  </q-item>

                  <q-separator/>

                  <q-item clickable v-close-popup @click="AddSlide(group)">
                    <q-item-section side>
                        <q-icon name="add"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Add Slide</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="DeleteGroup(i)">
                    <q-item-section side>
                        <q-icon name="delete"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Delete Group</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </template>

            <!--GROUP > SLIDE-->
            <q-expansion-item
              v-for="(slide, j) in group.slides" :key="j"
              :group="group.title"
              @click="SetActiveProperty(slide)"
              :content-inset-level="0.5"
              default-closed
              :expand-icon-class="slide.layers.length > 0 ? '' : 'hidden'"
              :header-class="{'bg-indigo-1': slide.active}">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon size="sm" flat round name="insert_drive_file" color="indigo-3"/>
                </q-item-section>
                <q-item-section>
                  {{ slide.title }}
                </q-item-section>
                <q-menu context-menu>
                  <q-list>
                    <q-item clickable>
                        <q-item-section side>
                            <q-icon name="edit"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Edit Title</q-item-label>
                        </q-item-section>
                        <q-popup-edit v-model="slide.title" auto-save v-slot="scope">
                          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                        </q-popup-edit>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup @click="AddLayer(slide)">
                        <q-item-section side>
                            <q-icon name="add"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Add Layer</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="DeleteSlide(i, j)">
                        <q-item-section side>
                            <q-icon name="delete"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Delete Slide</q-item-label>
                        </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </template>

              <!--GROUP > SLIDE > LAYER-->
              <q-item
                v-for="(layer, k) in slide.layers" :key="k"
                :class="{'bg-indigo-1': layer.active}"
                clickable v-ripple @click="SetActiveProperty(layer)">
                  <q-item-section avatar>
                    <q-icon size="sm" flat round name="layers" color="indigo-3"/>
                  </q-item-section>
                  <q-item-section>
                    {{ layer.title }}
                  </q-item-section>
                  <q-menu context-menu>
                    <q-list>
                      <q-item clickable>
                          <q-item-section side>
                              <q-icon name="edit"/>
                          </q-item-section>
                          <q-item-section>
                              <q-item-label>Edit Title</q-item-label>
                          </q-item-section>
                          <q-popup-edit v-model="layer.title" auto-save v-slot="scope">
                            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                          </q-popup-edit>
                      </q-item>

                      <q-separator/>

                      <q-item clickable v-close-popup @click="DeleteLayer(i, j, k)">
                          <q-item-section side>
                              <q-icon name="delete"/>
                          </q-item-section>
                          <q-item-section>
                              <q-item-label>Delete Layer</q-item-label>
                          </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
              </q-item>

            </q-expansion-item>

          </q-expansion-item>

          <q-separator/>

          <q-item clickable v-ripple @click="AddGroup()">
            <q-item-section>Create New Group</q-item-section>
          </q-item>

        </q-list>
    </q-drawer>

    <q-drawer
        v-model="rightDrawerOpen"
        show-if-above
        side="right"
        bordered :width="400">
        <q-scroll-area style="height: calc(100% - 116px); margin-bottom: 100px; border-right: 1px solid #ddd">
          <q-list>
            <!--GROUP-->
            <q-expansion-item
              v-for="(group, i) in story.groups" :key="i"
              dense expand-icon-toggle switch-toggle-side expand-separator
              :expand-icon-class="group.slides.length > 0 ? '' : 'invisible'"
              :content-inset-level="0.5" 
              default-opened>
              <template v-slot:header>
                <q-item-section>
                  {{ group.title }}
                </q-item-section>
              </template>

              <!--GROUP > SLIDE-->
              <q-expansion-item
                v-for="(slide, j) in group.slides" :key="j"
                dense expand-icon-toggle switch-toggle-side
                :expand-icon-class="slide.layers.length > 0 ? '' : 'invisible'"
                :content-inset-level="1"
                default-opened>
                <template v-slot:header>
                  <q-item-section>
                    {{ slide.title }}
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox size="sm" v-model="slide.export" />
                  </q-item-section>
                </template>

                <!--GROUP > SLIDE > LAYER-->
                <q-item v-for="(layer, k) in slide.layers" :key="k">
                    <q-item-section>
                      {{ layer.title }}
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox size="sm" v-model="layer.export" />
                    </q-item-section>
                </q-item>

              </q-expansion-item>

            </q-expansion-item>

          </q-list>
        </q-scroll-area>
        <q-card flat class="absolute-bottom" style="height: 116px; border-top: 1px solid #ddd">
            <q-card-section>
              <q-toggle v-model="exportVTT" left-label label="Export VTT" class="q-mb-sm"/>
              <q-btn outline color="primary" text-color="primary" label="Export" class="full-width" />
            </q-card-section>
        </q-card>
        <q-separator></q-separator>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SSMLHelpDialog from '../components/SSMLHelpDialog.vue'
import ImportExportDialog from '../components/ImportExportDialog.vue'
import story from '../components/StoryPlaceholder.js'
import tts_settings from '../components/TTSSettingsPlaceholder.js'

export default defineComponent({
  name: 'StoryLayout',
  components: {
    SSMLHelpDialog,
    ImportExportDialog
  },
  data() {
      return {
        story: story,
        tts_settings,
        leftDrawerOpen: false,
        rightDrawerOpen: false,
        storySettingsDialog: false,

        exportVTT: false
      }
  },
  mounted() {},
  methods: {
      SetAllActivePropertyFalse(){
        this.story.groups.forEach(group => {
          group.slides.forEach(slide => {
            slide.active = false;

            slide.layers.forEach(layer => {
              layer.active = false;
            });
          });
        });
      },
      SetActiveProperty(element){
        this.SetAllActivePropertyFalse();
        element.active = true;
      },
      AddGroup(){
        this.story.groups.push(
          {
            title: 'Enter new group name',
            slides: []
          }
        )
      },
      DeleteGroup(group_index){
        this.story.groups.splice(group_index, 1);
      },
      AddSlide(group){
        group.slides.push(
          {
            title: 'Enter new slide name',
            layers: []
          }
        )
      },
      DeleteSlide(group_index, slide_index){
        this.story.groups[group_index].slides.splice(slide_index, 1);
      },
      AddLayer(slide){
        slide.layers.push(
          {
            title: 'Enter new layer name'
          }
        )
      },
      DeleteLayer(group_index, slide_index, layer_index){
        this.story.groups[group_index].slides[slide_index].layers.splice(layer_index, 1);
      }
  }
})
</script>
