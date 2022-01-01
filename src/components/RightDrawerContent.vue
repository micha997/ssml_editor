<template>
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
            :content-inset-level="1.5"
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
            <q-item v-for="(layer, k) in slide.layers" :key="k" dense>
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
            <div>
            <q-toggle v-model="exportTTS" left-label label="Export TTS" size="sm" class="q-mb-sm q-mr-md"/>
            <q-toggle v-model="exportVTT" left-label label="Export VTT" size="sm" class="q-mb-sm"/>
            </div>
            <q-btn outline color="primary" text-color="primary" label="Export" class="full-width" />
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import story from '../components/StoryPlaceholder.js'

export default defineComponent({
  name: 'RightDrawerContent',
  data() {
      return {
        story,
        exportTTS: true,
        exportVTT: false,
      }
  }
})
</script>
