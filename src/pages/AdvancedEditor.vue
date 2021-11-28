<template>
  <q-page>
    <q-resize-observer @resize="onResize"/>
    <div :style="style">
      <q-scroll-area style="flex: 1;" class="q-pa-md">
        <SSMLEditor/>
        <SSMLEditor/>
        <SSMLEditor/>
        <SSMLEditor/>
        <SSMLEditor/>
        <SSMLEditor/>
        <SSMLEditor/>
        <SSMLEditor/>
      </q-scroll-area>

      <q-scroll-area style="width: 300px;">
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import SSMLEditor from '../components/SSMLEditor.vue'
export default {
  name: 'AdvancedEditor',
  components: {
    SSMLEditor
  },
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