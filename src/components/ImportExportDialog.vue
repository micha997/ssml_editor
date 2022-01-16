<template>
  <q-btn flat round dense class="q-mx-sm" icon="source">
    <q-menu>
      <q-list>
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
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ImportExportDialog',
  data(){
    return{
      $store: useStore(),

      visible: false,
      jsonFile: null,
    }
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
        this.$store.getters['project/getJsonData'],
        this.$store.state.project.title.replace(/ /g,"_") + ".json",
        "text/plain"
      );
    }
  }
})
</script>