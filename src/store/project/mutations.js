import { uid } from 'quasar'
import { getActiveElement } from './getters';

export const clearProject = (state) => {
    state.title = '';
    state.tts_settings = {
        voice: {
            languageCode: "de-DE",
            name: "de-DE-Wavenet-F"
        },
        audioConfig: {
            audioEncoding: "MP3",
            pitch: 0,
            speakingRate: 1
        }
    }
    state.groups = [];
}

export const updateTitle = (state, title) => {
    state.title = title;
}

export const updateProjectLanguageCode = (state, languageCode) => {
    state.tts_settings.voice.languageCode = languageCode;
}

export const updateProjectVoiceName = (state, name) => {
    state.tts_settings.voice.name = name;
}

export const updateTTSSettings = (state, tts_settings) => {
    state.tts_settings = tts_settings;
}

export const updateGroups = (state, groups) => {
    state.groups = groups;
}

// GROUP
export const createGroup = (state) => {
    state.groups.push(
        {
            uid: uid(),
            title: 'New Group',
            slides: []
        }
    );
}

export const deleteGroup = (state, groupID) => {
    state.groups.splice(groupID, 1);
}

export const updateGroupTitle = (state, {groupID, title}) => {
    state.groups[groupID].title = title;
}

// SLIDE
export const createSlide = (state, groupID) => {
    state.groups[groupID].slides.push(
        {
            uid: uid(),
            title: 'New Slide',
            export: false,
            layers: [],
            entries: []
        }
    )
}

export const deleteSlide = (state, {groupID, slideID}) => {
    state.groups[groupID].slides.splice(slideID, 1);
}

export const updateSlideTitle = (state, {groupID, slideID, title}) => {
    state.groups[groupID].slides[slideID].title = title;
}

// LAYER
export const createLayer = (state, {groupID, slideID}) => {
    state.groups[groupID].slides[slideID].layers.push(
        {
            uid: uid(),
            title: 'New Layer',
            export: false,
            entries: []
        }
    );
}

export const deleteLayer = (state, {groupID, slideID, layerID}) => {
    state.groups[groupID].slides[slideID].layers.splice(layerID, 1);
}

export const updateLayerTitle = (state, {groupID, slideID, layerID, title}) => {
    state.groups[groupID].slides[slideID].layers[layerID].title = title;
}

// ENTRY
export const createEntry = (state) => {
    const element = getActiveElement(state);

    element.entries.push(
        {
            uid: uid(),
            title: 'Enter Title',
            ssml: true,
            input: 'Enter Text'
        }
    );
}

export const deleteEntry = (state, entryID) => {
    const element = getActiveElement(state);

    element.entries.splice(entryID, 1);
}

export const updateEntryTitle = (state, {entryID, title}) => {
    const element = getActiveElement(state);

    element.entries[entryID].title = title;
}

export const updateEntryInput = (state, {entryID, input}) => {
    const element = getActiveElement(state);

    element.entries[entryID].input = input;
}

// SET EXPORT

export const toggleExport = (state, {groupID, slideID, layerID}) => {

    if (layerID == null){
        state.groups[groupID].slides[slideID].export =
        !state.groups[groupID].slides[slideID].export;
    }else{
        state.groups[groupID].slides[slideID].layers[layerID].export =
        !state.groups[groupID].slides[slideID].layers[layerID].export;
    }
}

// SET ACTIVE
export const updateActive = (state) => {
    state.groups.forEach(group => {
        group.slides.forEach(slide => {
            slide.active = false;

            slide.layers.forEach(layer => {
                layer.active = false;
            });
        });
    });

    const element = getActiveElement(state);

    element.active = true;
}

export const setGroupID = (state, groupID) => {
    state.groupID = groupID;
}

export const setSlideID = (state, slideID) => {
    state.slideID = slideID;
}

export const setLayerID = (state, layerID) => {
    state.layerID = layerID;
}