<template>
  <q-page>
    <q-resize-observer @resize="onResize"/>
    <div :style="style">
      <q-scroll-area v-if="storeElement != null" style="flex: 1;" class="q-pa-md">
        <SSMLEditor
          v-for="entry in storeElement.entries"
          :key="entry.uid"
          :entry="entry"/>
        <q-card flat bordered>
          <q-card-section class="flex row justify-center items-center">
            <q-btn outline dense round color="grey-5" icon="add" @click="createEntry()" />
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import SSMLEditor from '../components/SSMLEditor.vue'

export default {
  name: 'AdvancedEditor',
  components: {
    SSMLEditor
  },
  setup() {
    const store = useStore()

    const storeElement = computed({
      get: () => store.getters['project/getActiveElement']
    })

    return {
      store,
      storeElement,
    }
  },
  watch: {
    /*
    storeElement (newElement) {
      this.title = newElement.title;
      this.entries = [... newElement.entries];
    }
    */
  },
  data() {
    return {
      style: {
        display: 'flex',
        'align-items': 'stretch' 
      }
    }
  },
  methods: {
    createEntry(){
      this.store.commit('project/createEntry');
    },
    onResize (size) {
      this.style.height = size.height + 'px'
    },
  }
}
</script>