export function getActiveElement (state) {
    const groupID = state.groupID;
    const slideID = state.slideID;
    const layerID = state.layerID;

    if(groupID == null || slideID == null) return null;

    if(layerID == null){
        return state.groups[groupID].slides[slideID];
    }else{
        return state.groups[groupID].slides[slideID].layers[layerID];
    }
}

export const getEntryTitle = (state) => (entryID) => {
    const element = getActiveElement(state);

    return element.entries[entryID].title;
}

export const getEntryInput = (state) => (entryID) => {
    const element = getActiveElement(state);

    return element.entries[entryID].input;
}

export const getEntryLanguageCode = (state) => (entryID) => {
    const element = getActiveElement(state);

    return element.entries[entryID].tts_settings.voice.languageCode;
}

export const getEntryVoiceName = (state) => (entryID) => {
    const element = getActiveElement(state);

    return element.entries[entryID].tts_settings.voice.name;
}

export const getJsonData = (state) => {
    const toJson = {};

    toJson.title = state.title;
    toJson.groups = state.groups;
    toJson.tts_settings = state.tts_settings;

    return JSON.stringify(toJson, null, "\t");
}