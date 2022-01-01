<template>
    <q-list>
        <!--GROUP-->
        <q-expansion-item
        v-for="(group, i) in groups" :key="i"
        :group="story.title"
        expand-icon-toggle
        :expand-icon-class="group.slides.length > 0 ? '' : 'hidden'"
        :content-inset-level="0.5"
        default-closed>
        <template v-slot:header>
            <q-item-section avatar>
            <q-icon size="sm" flat round name="folder" color="primary"/>
            </q-item-section>
            <q-item-section>
            {{ group.title }}
            </q-item-section>
            <q-menu context-menu>
            <q-list>
                <q-item clickable>
                    <q-item-section side>
                        <q-icon name="edit"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Edit Title</q-item-label>
                    </q-item-section>
                    <q-popup-edit v-model="group.title" auto-save v-slot="scope">
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                </q-item>

                <q-separator/>

                <q-item clickable v-close-popup @click="AddSlide(group)">
                <q-item-section side>
                    <q-icon name="add"/>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Add Slide</q-item-label>
                </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="DeleteGroup(i)">
                <q-item-section side>
                    <q-icon name="delete"/>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Delete Group</q-item-label>
                </q-item-section>
                </q-item>
            </q-list>
            </q-menu>
        </template>

        <!--GROUP > SLIDE-->
        <q-expansion-item
            v-for="(slide, j) in group.slides" :key="j"
            :group="group.title"
            @click="SetActiveProperty(slide)"
            :content-inset-level="0.5"
            default-closed
            :expand-icon-class="slide.layers.length > 0 ? '' : 'hidden'"
            :header-class="{'bg-indigo-1': slide.active}">
            <template v-slot:header>
            <q-item-section avatar>
                <q-icon size="sm" flat round name="insert_drive_file" color="indigo-3"/>
            </q-item-section>
            <q-item-section>
                {{ slide.title }}
            </q-item-section>
            <q-menu context-menu>
                <q-list>
                <q-item clickable>
                    <q-item-section side>
                        <q-icon name="edit"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Edit Title</q-item-label>
                    </q-item-section>
                    <q-popup-edit v-model="slide.title" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                    </q-popup-edit>
                </q-item>

                <q-separator/>

                <q-item clickable v-close-popup @click="AddLayer(slide)">
                    <q-item-section side>
                        <q-icon name="add"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Add Layer</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="DeleteSlide(i, j)">
                    <q-item-section side>
                        <q-icon name="delete"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Delete Slide</q-item-label>
                    </q-item-section>
                </q-item>
                </q-list>
            </q-menu>
            </template>

            <!--GROUP > SLIDE > LAYER-->
            <q-item
            v-for="(layer, k) in slide.layers" :key="k"
            :class="{'bg-indigo-1': layer.active}"
            clickable v-ripple @click="SetActiveProperty(layer)">
                <q-item-section avatar>
                <q-icon size="sm" flat round name="layers" color="indigo-3"/>
                </q-item-section>
                <q-item-section>
                {{ layer.title }}
                </q-item-section>
                <q-menu context-menu>
                <q-list>
                    <q-item clickable>
                        <q-item-section side>
                            <q-icon name="edit"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Edit Title</q-item-label>
                        </q-item-section>
                        <q-popup-edit v-model="layer.title" auto-save v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                        </q-popup-edit>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup @click="DeleteLayer(i, j, k)">
                        <q-item-section side>
                            <q-icon name="delete"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Delete Layer</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
                </q-menu>
            </q-item>

        </q-expansion-item>

        </q-expansion-item>

        <q-separator/>

        <q-item clickable v-ripple @click="AddGroup()">
        <q-item-section>Create New Group</q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import story from '../components/StoryPlaceholder.js'

export default defineComponent({
  name: 'LeftDrawerContent',
  setup() {
      const $store = useStore()

      const groups = computed({
          get: () => $store.state.project.groups,
          set: val => $store.commit('project/updateGroups', val)
      })

      return {
          groups
      }
  },
  data(){
    return{
        story
    }
  },
  methods: {
    SetAllActivePropertyFalse(){
        this.story.groups.forEach(group => {
            group.slides.forEach(slide => {
            slide.active = false;

            slide.layers.forEach(layer => {
                layer.active = false;
            });
            });
        });
    },
    SetActiveProperty(element){
        this.SetAllActivePropertyFalse();
        element.active = true;
    },
    AddGroup(){
        this.story.groups.push(
            {
            title: 'Enter new group name',
            slides: []
            }
        )
    },
    DeleteGroup(group_index){
        this.story.groups.splice(group_index, 1);
    },
    AddSlide(group){
        group.slides.push(
            {
            title: 'Enter new slide name',
            layers: []
            }
        )
    },
    DeleteSlide(group_index, slide_index){
        this.story.groups[group_index].slides.splice(slide_index, 1);
    },
    AddLayer(slide){
        slide.layers.push(
            {
            title: 'Enter new layer name'
            }
        )
    },
    DeleteLayer(group_index, slide_index, layer_index){
        this.story.groups[group_index].slides[slide_index].layers.splice(layer_index, 1);
    }
  }
})
</script>