<template>
  <q-btn flat round dense class="q-mr-sm" icon="help" @click="visible = true"/>

  <!--SSML Help Dialog-->
  <q-dialog v-model="visible">
    <q-card style="width: 600px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">SSML Guide</div>
      </q-card-section>

      <!--Break-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="pause" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Break</q-item-label>
            <q-item-label caption>An empty element that controls pausing or other prosodic boundaries between words.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Say As-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="call_split" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Say As</q-item-label>
            <q-item-label caption>This element lets you indicate information about the type of text construct that is contained within the element.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Substitute-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="alt_route" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Substitute</q-item-label>
            <q-item-label caption>Indicate that the text in the alias attribute value replaces the contained text for pronunciation.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Prosody-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="speed" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Prosody</q-item-label>
            <q-item-label caption>Used to customize the pitch, speaking rate, and volume of text contained by the element.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Emphasis-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="highlight" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Emphasis</q-item-label>
            <q-item-label caption>Used to add or remove emphasis from text contained by the element.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Voice-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="record_voice_over" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Voice</q-item-label>
            <q-item-label caption>The voice tag allows you to use more than one voice in a single SSML request.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Language-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="translate" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Language</q-item-label>
            <q-item-label caption>You can use language to include text in multiple languages within the same SSML request.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator inset/>

      <!--Phoneme-->
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn round color="primary" icon="rtt" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Phoneme</q-item-label>
            <q-item-label caption>You can use the phoneme tag to produce custom pronunciations of words inline.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

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