<template>
  <q-btn flat round dense class="q-mx-sm" icon="source">
    <q-menu>
      <q-list>

        <q-item clickable v-close-popup @click="Save()">
          <q-item-section side>
            <q-icon name="save"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Save Project</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="$store.state.project.dataInStorage" clickable v-close-popup @click="Load()">
          <q-item-section side>
            <q-icon name="update"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Reload Project</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="visible = true">
          <q-item-section side>
            <q-icon name="file_upload"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Upload Project</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="Download()">
          <q-item-section side>
            <q-icon name="file_download"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Download Project</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-menu>
  </q-btn>

  <!--Upload Dialog-->
  <q-dialog v-model="visible">
    <q-card style="width: 600px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Upload Project</div>
      </q-card-section>

      <q-card-section>
        <q-file outlined clearable v-model="jsonFile" accept=".json, application/json">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup/>
        <q-btn flat label="Upload" v-close-popup @click="Upload()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ImportExportDialog',
  data(){
    return{
      $q: useQuasar(),
      $store: useStore(),

      visible: false,
      jsonFile: null,
    }
  },
  mounted(){
    // Check for data in storage
    this.$store.commit('project/updateStorageState');
    if(this.$store.state.project.dataInStorage) this.$store.dispatch('project/LoadFromStorage');

    // Setup save shortcut
    document.addEventListener("keydown", this.SaveShortcut);
  },
  beforeUnmount(){
    // Desetup save shortcut
    document.removeEventListener("keydown", this.SaveShortcut);
  },
  methods: {
    Upload(){
      const reader = new FileReader();
      reader.onload = e => {
        this.$store.dispatch('project/LoadProjectFromFile', JSON.parse(e.target.result))
      };
      reader.readAsText(this.jsonFile);
    },
    Download(){
      require("downloadjs")
      (
        'data:text/json;charset=utf-8,' + encodeURIComponent(this.$store.getters['project/getJsonData']),
        this.$store.state.project.title.replace(/ /g,"_") + ".json", "text/plain"
      );
    },
    SaveShortcut(e){
      if(!(e.keyCode === 83 && (e.ctrlKey || e.metaKey))){
        return;
      }

      e.preventDefault();
      this.Save();
    },
    Save(){
      this.$store.dispatch('project/SaveToStorage');
      this.$q.notify({
        type: 'positive',
        message: 'Your project has been saved to the browser storage.'
      })
    },
    Load(){
      this.$store.dispatch('project/LoadFromStorage');
      this.$q.notify({
        type: 'positive',
        message: 'Your project has been loaded from the browser storage.'
      })
    }
  }
})
</script>