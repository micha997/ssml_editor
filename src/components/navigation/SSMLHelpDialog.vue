<template>
  <q-btn flat round dense class="q-mr-sm" icon="help" @click="visible = true"/>

  <!--SSML Help Dialog-->
  <q-dialog v-model="visible">

    <q-card style="width: 600px">

      <q-card-section class="bg-primary text-white">
        <div class="text-h6">SSML Guide</div>
      </q-card-section>

      <q-scroll-area
      :visible="visible"
      style="height: 600px;">

      <!--Break-->
      <q-item class="q-py-md" clickable @click="break_visible = !break_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="pause"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Break</q-item-label>
          <q-item-label caption>An empty element that controls pausing or other prosodic boundaries between words.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="break_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Hallo, <span>&lt;break time="2000ms"/&gt;</span> wie gehts?.
              </code>
            </q-card-section>
            <q-card-section>
              <div class="text-caption text-center">Without SSML</div>
              <audio controls style="width: 100%">
                <source :src="break_before.src" type="audio/mp3">
                <p>Audio Element not supported</p>
              </audio>

              <div class="text-caption text-center">With SSML</div>
              <audio controls style="width: 100%">
                <source :src="break_after.src" type="audio/mp3">
                <p>Audio Element not supported</p>
              </audio>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Say As-->
      <q-item class="q-py-md" clickable @click="sayas_visible = !sayas_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="call_split" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Say As</q-item-label>
          <q-item-label caption>This element lets you indicate information about the type of text construct that is contained within the element.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="sayas_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Substitute-->
      <q-item class="q-py-md" clickable @click="substitute_visible = !substitute_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="alt_route" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Substitute</q-item-label>
          <q-item-label caption>Indicate that the text in the alias attribute value replaces the contained text for pronunciation.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="substitute_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Prosody-->
      <q-item class="q-py-md" clickable @click="prosody_visible = !prosody_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="speed" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Prosody</q-item-label>
          <q-item-label caption>Used to customize the pitch, speaking rate, and volume of text contained by the element.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="prosody_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Emphasis-->
      <q-item class="q-py-md" clickable @click="emphasis_visible = !emphasis_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="highlight" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Emphasis</q-item-label>
          <q-item-label caption>Used to add or remove emphasis from text contained by the element.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="emphasis_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Voice-->
      <q-item class="q-py-md" clickable @click="voice_visible = !voice_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="record_voice_over" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Voice</q-item-label>
          <q-item-label caption>The voice tag allows you to use more than one voice in a single SSML request.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="voice_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Language-->
      <q-item class="q-py-md" clickable @click="language_visible = !language_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="translate" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Language</q-item-label>
          <q-item-label caption>You can use language to include text in multiple languages within the same SSML request.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="language_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      <q-separator inset/>

      <!--Phoneme-->
      <q-item class="q-py-md" clickable @click="phoneme_visible = !phoneme_visible">
        <q-item-section avatar>
          <q-btn round unelevated color="primary" icon="rtt" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Phoneme</q-item-label>
          <q-item-label caption>You can use the phoneme tag to produce custom pronunciations of words inline.</q-item-label>
        </q-item-section>
      </q-item>

      <q-slide-transition>
        <div v-show="phoneme_visible">
            <q-card-section class="bg-grey-2">
              <code>
                Step 1, take a deep breath. <span>&lt;break time="2000ms"/&gt;</span> Step 2, exhale.
              </code>
            </q-card-section>
        </div>
      </q-slide-transition>

      </q-scroll-area>

    </q-card>

  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SSMLHelpDialog',
  data(){
    return{
      visible: false,
      break_visible: false,
      sayas_visible: false,
      substitute_visible: false,
      prosody_visible: false,
      emphasis_visible: false,
      voice_visible: false,
      language_visible: false,
      phoneme_visible: false,

      break_before:
      {
        src: require('../../assets/ssmlguidecontent/Break_Before.mp3'),
        type: 'audio/mp3'
      },
      break_after:
      {
        src: require('../../assets/ssmlguidecontent/Break_After.mp3'),
        type: 'audio/mp3'
      }
    }
  }
})
</script>
<style lang="scss">
code {
  span {
    background: white;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
  }
}
.q-media {
  background: $primary;
}
</style>