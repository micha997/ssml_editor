<template>
    <q-list>
        <!--GROUP-->
        <q-expansion-item
        v-for="(group, i) in groups" :key="i"
        :group="store.state.title"
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

                <q-item clickable v-close-popup @click="CreateSlide(i)">
                <q-item-section side>
                    <q-icon name="add"/>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Create Slide</q-item-label>
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
            @click="SetActiveSlide(i, j)"
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

                <q-item clickable v-close-popup @click="CreateLayer(i, j)">
                    <q-item-section side>
                        <q-icon name="add"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Create Layer</q-item-label>
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
            clickable v-ripple @click="SetActiveLayer(i, j, k)">
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

        <q-item clickable v-ripple @click="CreateGroup()">
        <q-item-section>Create Group</q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'LeftDrawerContent',
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
  methods: {
    SetActiveSlide(group_index, slide_index){
        this.store.dispatch('project/SetActiveSlide', {group_index, slide_index});
    },
    SetActiveLayer(group_index, slide_index, layer_index){
        this.store.dispatch('project/SetActiveLayer', {group_index, slide_index, layer_index});
    },
    CreateGroup(){
        this.store.commit('project/createGroup');
    },
    DeleteGroup(group_index){
        this.store.commit('project/deleteGroup', group_index);
    },
    CreateSlide(group_index){
        this.store.commit('project/createSlide', group_index);
    },
    DeleteSlide(group_index, slide_index){
        this.store.commit('project/deleteSlide', {group_index, slide_index});
    },
    CreateLayer(group_index, slide_index){
        this.store.commit('project/createLayer', {group_index, slide_index});
    },
    DeleteLayer(group_index, slide_index, layer_index){
        this.store.commit('project/deleteLayer', {group_index, slide_index, layer_index});
    }
  }
})
</script>