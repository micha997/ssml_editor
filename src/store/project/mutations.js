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
            title: 'New Group',
            slides: []
        }
    );
}

export const deleteGroup = (state, group_index) => {
    state.groups.splice(group_index, 1);
}

// SLIDE
export const createSlide = (state, group_index) => {
    state.groups[group_index].slides.push(
        {
            title: 'New Slide',
            export: false,
            layers: []
        }
    )
}

export const deleteSlide = (state, {group_index, slide_index}) => {
    state.groups[group_index].slides.splice(slide_index, 1);
}

// LAYER
export const createLayer = (state, {group_index, slide_index}) => {
    state.groups[group_index].slides[slide_index].layers.push(
        {
            title: 'New Layer',
            export: false
        }
    );
}

export const deleteLayer = (state, {group_index, slide_index, layer_index}) => {
    state.groups[group_index].slides[slide_index].layers.splice(layer_index, 1);
}

// SET EXPORT
export const toggleExportSlide = (state, {group_index, slide_index}) => {
    state.groups[group_index].slides[slide_index].export !=
    state.groups[group_index].slides[slide_index].export;
}

export const toggleExportLayer = (state, {group_index, slide_index, layer_index}) => {
    state.groups[group_index].slides[slide_index].layers[layer_index].export !=
    state.groups[group_index].slides[slide_index].layers[layer_index].export;
}

// SET ACTIVE
export const setAllInactive = (state) => {
    state.groups.forEach(group => {
        group.slides.forEach(slide => {
            slide.active = false;

            slide.layers.forEach(layer => {
                layer.active = false;
            });
        });
    });
}

export const setActiveSlide = (state, {group_index, slide_index}) => {
    state.groups[group_index].slides[slide_index].active = true;
    state.activeElement = {group_index, slide_index};
}

export const setActiveLayer = (state, {group_index, slide_index, layer_index}) => {
    state.groups[group_index].slides[slide_index].layers[layer_index].active = true;
    state.activeElement = {group_index, slide_index, layer_index};
}