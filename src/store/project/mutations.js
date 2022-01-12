import { uid } from 'quasar'

export const updateTitle = (state, title) => {
    state.title = title;
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

// SLIDE
export const createSlide = (state, groupID) => {
    state.groups[groupID].slides.push(
        {
            uid: uid(),
            title: 'New Slide',
            export: false,
            layers: []
        }
    )
}

export const deleteSlide = (state, {groupID, slideID}) => {
    state.groups[groupID].slides.splice(slideID, 1);
}

// LAYER
export const createLayer = (state, {groupID, slideID}) => {
    state.groups[groupID].slides[slideID].layers.push(
        {
            uid: uid(),
            title: 'New Layer',
            export: false
        }
    );
}

export const deleteLayer = (state, {groupID, slideID, layerID}) => {
    state.groups[groupID].slides[slideID].layers.splice(layerID, 1);
}

// ENTRY
export const createEntry = (state) => {
    const newEntry = {
        uid: uid(),
        title: 'Enter Title',
        ssml: true,
        input: 'Enter Text'
    }

    if(state.layerID == null){
        return state.groups[state.groupID].slides[state.slideID].entries.push(newEntry);
    }else{
        return state.groups[state.groupID].slides[state.slideID].layers[state.layerID].entries.push(newEntry);
    }
}

// SET EXPORT
export const toggleExportSlide = (state, {groupID, slideID}) => {
    state.groups[groupID].slides[slideID].export !=
    state.groups[groupID].slides[slideID].export;
}

export const toggleExportLayer = (state, {groupID, slideID, layerID}) => {
    state.groups[groupID].slides[slideID].layers[layerID].export !=
    state.groups[groupID].slides[slideID].layers[layerID].export;
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

    if(state.layerID == null){
        return state.groups[state.groupID].slides[state.slideID].active = true;
    }else{
        return state.groups[state.groupID].slides[state.slideID].layers[state.layerID].active = true;
    }
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