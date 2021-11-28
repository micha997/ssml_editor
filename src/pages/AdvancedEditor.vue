<template>
  <q-page>
    <q-resize-observer @resize="onResize"/>
    <div :style="style">
      <q-scroll-area style="flex: 1;" class="q-pa-md">
        <div class="text-h5 q-mb-xs">Title 1</div>
        <q-editor
          class="q-mb-md"
          ref="editorRef"
          v-model="editor"
          :definitions="definitions"
          :toolbar="toolbar"
          toolbar-rounded
          min-height="8rem">
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
        <div class="text-h5 q-mb-xs">Title 2</div>
        <q-editor
          class="q-mb-md"
          ref="editorRef"
          v-model="editor"
          :definitions="definitions"
          :toolbar="toolbar"
          toolbar-rounded
          min-height="8rem">
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
              unelevated
              dense
              rounded
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
        <div class="text-h5 q-mb-xs">Title 3</div>
        <q-editor
          class="q-mb-md"
          ref="editorRef"
          v-model="editor"
          :definitions="definitions"
          :toolbar="toolbar"
          toolbar-rounded
          min-height="8rem">
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
              unelevated
              dense
              rounded
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
        <div class="text-h5 q-mb-xs">Title 4</div>
        <q-editor
          class="q-mb-md"
          ref="editorRef"
          v-model="editor"
          :definitions="definitions"
          :toolbar="toolbar"
          toolbar-rounded
          min-height="8rem">
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
              unelevated
              dense
              rounded
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
        <div class="text-h5 q-mb-xs">Title 5</div>
        <q-editor
          class="q-mb-md"
          ref="editorRef"
          v-model="editor"
          :definitions="definitions"
          :toolbar="toolbar"
          toolbar-rounded
          min-height="8rem">
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
              unelevated
              dense
              rounded
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
      </q-scroll-area>

      <q-scroll-area style="width: 300px; background: teal">
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'AdvancedEditor',
  data() {
    return {
      editor: 'Hello There',
      definitions: {},
      toolbar: [
        ['break', 'language']
      ],
      style: {
        display: 'flex',
        'align-items': 'stretch' 
      }
    }
  },
  methods: {
    onResize (size) {
      this.style.height = size.height + 'px'
    },
  }
}
</script>