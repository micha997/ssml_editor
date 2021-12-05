<template>
  <q-btn flat round dense class="q-mr-sm" icon="help" @click="visible = true"/>

  <!--SSML Help Dialog-->
  <q-dialog v-model="visible">
    <q-card style="width: 600px" class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">SSML Help</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup/>
        <q-btn flat label="Upload" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SSMLHelpDialog',
  data(){
    return{
      visible: false
    }
  }
})
</script>