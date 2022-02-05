<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round
          icon="menu" aria-label="Menu"
          @click="leftDrawerState = !leftDrawerState"/>
        <q-toolbar-title class="cursor-pointer">
          {{projectTitle}}
          <q-popup-edit v-model="projectTitle" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-toolbar-title>
        <q-space ></q-space>
        <!--SSML Help Dialog-->
        <SSMLHelpDialog/>
        <q-separator dark vertical/>

        <q-btn flat dense round class="q-ml-sm"
          icon="save" aria-label="Save"
          @click="Save()"/>

        <ImportExportDialog/>

        <SettingsDialog/>
        <q-separator dark vertical/>
        <q-btn flat dense round class="q-ml-sm"
          icon="import_export" aria-label="Audio Menu"
          @click="rightDrawerState = !rightDrawerState"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerState"
      bordered :width="400">
        <LeftDrawerContent/>
    </q-drawer>

    <q-drawer
        v-model="rightDrawerState"
        side="right"
        bordered :width="400">
        <RightDrawerContent/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import SSMLHelpDialog from '../components/SSMLHelpDialog.vue'
import ImportExportDialog from '../components/ImportExportDialog.vue'
import SettingsDialog from '../components/SettingsDialog.vue'
import LeftDrawerContent from '../components/LeftDrawerContent.vue'
import RightDrawerContent from '../components/RightDrawerContent.vue'

export default defineComponent({
  name: 'StoryLayout',
  components: {
    SSMLHelpDialog,
    ImportExportDialog,
    SettingsDialog,
    LeftDrawerContent,
    RightDrawerContent
  },
  setup() {
    const quasar = useQuasar();
    const store = useStore();

    const leftDrawerState = computed({
      get: () => store.state.app.leftDrawerState,
      set: val => store.commit('app/updateLeftDrawerState', val)
    });

    const rightDrawerState = computed({
      get: () => store.state.app.rightDrawerState,
      set: val => store.commit('app/updateRightDrawerState', val)
    });

    const projectTitle = computed({
      get: () => store.state.project.title,
      set: val => store.commit('project/updateTitle', val)
    });

    return {
      quasar,
      store,
      leftDrawerState,
      rightDrawerState,
      projectTitle
    }
  },
  methods: {
    Save(){
      this.store.dispatch('project/SaveToStorage');
      this.quasar.notify({
        type: 'positive',
        message: 'Your project has been saved to the browser storage.'
      })
    }
  }
})
</script>
