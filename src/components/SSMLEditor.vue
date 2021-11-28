<template>
    <q-card flat bordered class="q-mb-md">
        <q-card-section>
            <q-item class="q-pa-none">
                <q-item-section>
                    <div class="text-h5 q-mb-xs">Title</div>
                </q-item-section>
                <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn class="gt-xs" size="12px" flat dense round
                        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                        @click="expanded = !expanded"/>
                        <q-btn class="gt-xs" size="12px" flat dense round icon="settings" />
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
                        v-model="editor"
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
  data() {
      return {
            editor: 'Hello There',
            definitions: {},
            toolbar: [
                ['break', 'language']
            ],
            expanded: true
      }
  }
})
</script>
