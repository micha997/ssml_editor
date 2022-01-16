<template>
  <q-page class="flex flex-center">
    <q-card style="width: 600px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">SSML Editor</div>
      </q-card-section>

      <!--New Project-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="add" @click="create_visible = !create_visible"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>New Project</q-item-label>
            <q-item-label caption>Write TTS with a SSML Editor and organize your work with a clear UI.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-slide-transition>
        <div v-show="create_visible">
            <q-separator />
            <q-card-section>
                <q-input outlined clearable v-model="create_project_title" label="New Project Title" />
            </q-card-section>

            <q-card-actions align="center" class="text-primary">
                <q-btn flat label="Cancel" @click="create_visible = false; create_project_title = '';"/>
                <q-btn flat label="Create" v-close-popup @click="CreateProject()"/>
            </q-card-actions>
        </div>
      </q-slide-transition>

      <q-separator inset/>

     <!--Load Project-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="file_upload" @click="load_visible = !load_visible"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Load Project</q-item-label>
            <q-item-label caption>Provide a fitting JSON file and load in your project and start working.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-slide-transition>
        <div v-show="load_visible">
            <q-separator />
            <q-card-section>
                <q-file outlined clearable v-model="jsonFile" accept=".json, application/json">
                    <template v-slot:prepend>
                    <q-icon name="attach_file" />
                    </template>
                </q-file>
            </q-card-section>

            <q-card-actions align="center" class="text-primary">
                <q-btn flat label="Cancel" @click="load_visible = false"/>
                <q-btn flat label="Upload" v-close-popup @click="Upload()"/>
            </q-card-actions>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Example Project-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="visibility" @click="LoadExampleProject()"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Example Project</q-item-label>
            <q-item-label caption>See how a project could look like.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  data(){
    return{
      $store: useStore(),
      
      create_visible: false,
      create_project_title: '',
      load_visible: false,
      jsonFile: null
    }
  },
  methods: {
    CreateProject(){
      this.$store.dispatch('project/CreateProject', this.create_project_title);
      this.$router.replace('/project')
    },
    Upload(){
      const reader = new FileReader();
      reader.onload = e => {
        this.$store.dispatch('project/LoadProjectFromFile', JSON.parse(e.target.result))
      };
      reader.readAsText(this.jsonFile);

      this.$router.replace('/project');
    },
    LoadExampleProject(){
      this.$store.dispatch('project/LoadExampleProject');
      this.$router.replace('/project');
    }
  }
})
</script>