import story from '../../components/StoryPlaceholder.js'

export function LoadExampleProject (context) {
    context.commit('updateTitle', story.title);
    context.commit('updateTTSSettings', story.tts_settings);
    context.commit('updateGroups', story.groups);
}

export function SetActiveSlide (context, {group_index, slide_index}) {
    context.commit('setAllInactive');
    context.commit('setActiveSlide', {group_index, slide_index});
}

export function SetActiveLayer (context, {group_index, slide_index, layer_index}) {
    context.commit('setAllInactive');
    context.commit('setActiveLayer', {group_index, slide_index, layer_index});
}