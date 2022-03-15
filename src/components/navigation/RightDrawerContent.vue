<template>
<q-scroll-area style="height: calc(100% - 116px); margin-bottom: 100px; border-right: 1px solid #ddd">
    <q-list>
        <!--GROUP-->
        <q-expansion-item
            v-for="(group, groupID) in groups" :key="groupID"
            dense expand-icon-toggle switch-toggle-side expand-separator
            :expand-icon-class="group.slides.length > 0 ? '' : 'invisible'"
            :content-inset-level="0.5" 
            default-opened>
            <template v-slot:header>
            <q-item-section>
                {{ group.title }}
            </q-item-section>
            </template>

            <!--GROUP > SLIDE-->
            <q-expansion-item
            v-for="(slide, slideID) in group.slides" :key="slideID"
            dense expand-icon-toggle switch-toggle-side
            :expand-icon-class="slide.layers.length > 0 ? '' : 'invisible'"
            :content-inset-level="1.5"
            default-opened>
            <template v-slot:header>
                <q-item-section>
                {{ slide.title }}
                </q-item-section>
                <q-item-section side>
                    <q-checkbox size="sm" :modelValue="slide.export" @update:modelValue="setToggle(groupID, slideID)"/>
                </q-item-section>
            </template>

            <!--GROUP > SLIDE > LAYER-->
            <q-item v-for="(layer, layerID) in slide.layers" :key="layerID" dense>
                <q-item-section>
                    {{ layer.title }}
                </q-item-section>
                <q-item-section side>
                    <q-checkbox size="sm" :modelValue="layer.export" @update:modelValue="setToggle(groupID, slideID, layerID)"/>
                </q-item-section>
            </q-item>

            </q-expansion-item>

        </q-expansion-item>

        </q-list>
    </q-scroll-area>
    <q-card flat class="absolute-bottom" style="height: 116px; border-top: 1px solid #ddd">
        <q-linear-progress v-if="!isError" indeterminate :class="{invisible: !isLoading}"/>
        <q-linear-progress v-else value="1.0" color="negative"/>
        <q-card-section>
            <div>
            <q-toggle v-model="exportTTS" left-label label="Export TTS" size="sm" class="q-mb-sm q-mr-md"/>
            <q-toggle v-model="exportVTT" left-label label="Export VTT" size="sm" class="q-mb-sm"/>
            </div>
            <q-btn outline color="primary" text-color="primary" label="Export" class="full-width" @click="exportSelection()"/>
        </q-card-section>
    </q-card>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { buildBody, generateTTS } from '../tts/SSMLClient.js'

import JSZip from "jszip"
import FileSaver from "file-saver"
import Vtt from "vtt-creator"

export default defineComponent({
    name: 'RightDrawerContent',
    setup() {
        const store = useStore()
        
        const groups = computed({
            get: () => store.state.project.groups,
            set: val => store.commit('project/updateGroups', val)
            })
            
        return {
            store,
            groups
        }
    },
    data() {
        return {
            exportTTS: true,
            exportVTT: false,
            $q: useQuasar(),
            isLoading: false,
            isError: false,
        }
    },
    methods: {
        setToggle(groupID, slideID, layerID = null){
            this.store.commit('project/toggleExport', {groupID, slideID, layerID});
        },
        exportSelection(){
            this.startLoadingIndicator();

            const groups = this.store.state.project.groups;
            let exportList = [];

            // Prepare Export List
            // GROUP
            groups.forEach((group, groupIndex) => {
                // GROUP > SLIDE
                group.slides.forEach((slide, slideIndex) => {
                    if (!slide.export) return;

                    // GROUP > SLIDE > ENTRY
                    slide.entries.forEach((entry, entryIndex) => {
                        exportList.push({
                            name:
                                (groupIndex + 1) + "_" +
                                (slideIndex + 1) + "_" +
                                (entryIndex + 1) + "_" +
                                entry.title,
                            input: entry.input,
                            tts_settings: entry.tts_settings,
                            audio: ""
                        });
                    });

                    // GROUP > SLIDE > LAYER
                    slide.layers.forEach((layer, layerIndex) => {
                        if (!layer.export) return;

                        // GROUP > SLIDE > LAYER > ENTRY
                        layer.entries.forEach((entry, entryIndex) => {
                                exportList.push({
                                    name: 
                                        (groupIndex + 1) + "_" +
                                        (slideIndex + 1) + "_" +
                                        (layerIndex + 1) + "_" +
                                        (entryIndex + 1) + "_" +
                                        entry.title,
                                    input: entry.input,
                                    tts_settings: entry.tts_settings,
                                    audio: ""
                                });
                        });
                    });
                });
            });

            // Create Promise list of api requests
            let generatePromises = []
            exportList.forEach(item => {
                    let body = buildBody(item.input, { languageCode: item.tts_settings.voice.languageCode, name: item.tts_settings.voice.name});
                    generatePromises.push(new generateTTS(body, false));
            });

            // Get all requests
            Promise.all(generatePromises)
            .then((values) => {
                values.forEach((item, index) =>{
                    exportList[index].audio = item.src;
                });

                this.downloadSelection(exportList);

                this.stopLoadingIndicator();

                this.$q.notify({
                    type: 'positive',
                    message: 'Successfully exported audio.'
                });
            })
            .catch((error) => {
                this.showErrorIndicator();

                this.$q.notify({
                    type: 'negative',
                    message: 'Error exporting audio.'
                });
            });
        },
        async downloadSelection(exportList){
            const ROOT_FOLDER = this.store.state.project.title;
            const MP3_FOLDER = "mp3";
            const VTT_FOLDER = "vtt";
            
            // Create Zip Instance
            var zip = new JSZip();

            // Add files to folder
            for (const item of exportList) {
                // Add mp3 to zip folder
                if (this.exportTTS)
                    zip.folder(ROOT_FOLDER + "/" + MP3_FOLDER).file(item.name + ".mp3", item.audio, {base64: true});

                // Skip vtt export if not active
                if (!this.exportVTT) continue;

                // Get audio file duration
                let audioDuration = await new Promise(resolve => {
                    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    audioContext.decodeAudioData(this.base64ToArrayBuffer(item.audio),
                        buffer => { resolve(buffer.duration); }
                    );
                });

                // Generate vtt file
                let vttFile = this.getVtt(item.input, audioDuration);

                // Add vtt to zip folder
                zip.folder(ROOT_FOLDER + "/" + VTT_FOLDER).file(item.name + ".vtt", vttFile);
            };
            
            // Trigger download
            zip.generateAsync({type:"blob"})
            .then(blob => { 
                FileSaver.saveAs(blob, ROOT_FOLDER + ".zip");
            });
        },
        startLoadingIndicator(){
            this.isLoading = true;
            this.isError = false;
        },
        stopLoadingIndicator(){
            this.isLoading = false;
            this.isError = false;
        },
        showErrorIndicator(){
            this.isLoading = false;
            this.isError = true;
        },
        base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        },
        getVtt(input, duration){
            // Remove SSML tags
            let text = input.replace(/<\/?[^>]+(>|$)/g, "");

            // Vtt parameters
            const SPLIT_LENGTH = 42;
            let text_blocks = Math.ceil(text.length / SPLIT_LENGTH);
            let duration_blocks = duration / text_blocks;

            var vtt = new Vtt();

            // Based on parameters add multiple subtitle blocks
            for (let i = 0; i < text_blocks; i++){
                vtt.add(
                    duration_blocks * i,            // Start time
                    duration_blocks * (i + 1),      // End time
                    text.substring(SPLIT_LENGTH * i, SPLIT_LENGTH * (i + 1)) // Substring
                );
            }

            return vtt.toString();
        }
    }
})
</script>
