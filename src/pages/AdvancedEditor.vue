<template>
  <q-page>
    <q-resize-observer @resize="onResize"/>
    <div :style="style">
      <q-scroll-area style="flex: 1;" class="q-pa-md">
        <SSMLEditor
          v-for="(entry, index) in storyElement.entries"
          :key="index"
          :entry="entry"/>
        <q-card flat bordered>
          <q-card-section class="flex row justify-center items-center">
            <q-btn outline dense round color="grey-5" icon="add" @click="addNewEntry()" />
          </q-card-section>
        </q-card>
      </q-scroll-area>
      <!--
      <q-scroll-area style="width: 300px;">
      </q-scroll-area>
      -->
    </div>
  </q-page>
</template>

<script>
import SSMLEditor from '../components/SSMLEditor.vue'
import story from '../components/StoryPlaceholder.js'

export default {
  name: 'AdvancedEditor',
  components: {
    SSMLEditor
  },
  data() {
    return {
      storyElement: story.groups[0].slides[0].layers[0],
      style: {
        display: 'flex',
        'align-items': 'stretch' 
      }
    }
  },
  methods: {
    addNewEntry(){
      this.storyElement.entries.push(
        {
          title: 'Enter Title',
          ssml: true,
          input: 'Enter Text'
        }
      )
    },
    onResize (size) {
      this.style.height = size.height + 'px'
    },
  }
}
</script>