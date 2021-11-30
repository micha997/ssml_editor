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
                    <div class="text-grey-8 q-gutter-xs q-pr-sm">
                        <q-toggle
                            size="sm"
                            v-model="ssml"
                            label="SSML"
                            left-label/>
                        <q-btn class="gt-xs" size="12px" flat dense round icon="more_vert">
                            <q-menu>
                                <q-list>
                                    <q-item clickable v-close-popup>
                                        <q-item-section side>
                                            <q-icon name="edit"/>
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>Edit</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
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
                <q-separator vertical/>
                <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn class="gt-xs" size="12px" flat dense round icon="volume_up" />
                    </div>
                </q-item-section>
            </q-item>
        </q-card-section>
        <q-slide-transition>
            <div v-show="expanded">
                <q-separator />
                <q-card-section class="q-pa-none">
                    <q-editor
                        ref="editorRef"
                        flat
                        content-class="bg-indigo-1"
                        v-model="input"
                        :definitions="definitions"
                        :toolbar="toolbar"
                        min-height="8rem">
                        <template v-slot:break>
                            <q-btn-dropdown
                                unelevated dense rounded
                                menu-anchor="top right"
                                menu-self="top left"
                                color="white"
                                text-color="primary"
                                no-icon-animation
                                dropdown-icon="pause"
                                size="md">
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
                            <q-btn
                                unelevated dense rounded
                                color="white"
                                text-color="primary"
                                icon="call_split"
                                size="md"/>
                        </template>
                        <template v-slot:sub>
                            <q-btn
                                unelevated dense rounded
                                color="white"
                                text-color="primary"
                                icon="alt_route"
                                size="md"/>
                        </template>
                        <template v-slot:prosody>
                            <q-btn
                                unelevated dense rounded
                                color="white"
                                text-color="primary"
                                icon="speed"
                                size="md"/>
                        </template>
                        <template v-slot:emphasis>
                            <q-btn
                                unelevated dense rounded
                                color="white"
                                text-color="primary"
                                icon="highlight"
                                size="md"/>
                        </template>
                        <template v-slot:voice>
                            <q-btn
                                unelevated dense rounded
                                color="white"
                                text-color="primary"
                                icon="record_voice_over"
                                size="md"/>
                        </template>
                        <template v-slot:language>
                            <q-btn-dropdown
                                unelevated dense rounded
                                menu-anchor="top right"
                                menu-self="top left"
                                color="white"
                                text-color="primary"
                                no-icon-animation
                                dropdown-icon="translate"
                                size="md">
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
                            <q-btn
                                unelevated dense rounded
                                color="white"
                                text-color="primary"
                                icon="rtt"
                                size="md"/>
                        </template>
                    </q-editor>
                </q-card-section>
            </div>
        </q-slide-transition>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SSMLEditor',
  props: {
      entry: {
          type: Object,
      }
  },
  data() {
      return {
            title: this.entry.title,
            ssml: this.entry.ssml,
            input: this.entry.input,
            definitions: {},
            toolbar: [
                ['break', 'sayas', 'sub', 'prosody', 'emphasis', 'voice', 'language', 'phoneme']
            ],
            expanded: true
      }
  }
})
</script>
