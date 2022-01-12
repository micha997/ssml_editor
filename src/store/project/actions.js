import story from '../../components/StoryPlaceholder.js'

export function LoadExampleProject (context) {
    context.commit('updateTitle', story.title);
    context.commit('updateTTSSettings', story.tts_settings);
    context.commit('updateGroups', story.groups);
}

export function SetActiveElement (context, {groupID, slideID, layerID}) {
    context.commit('setGroupID', groupID);
    context.commit('setSlideID', slideID);
    context.commit('setLayerID', layerID);
    context.commit('updateActive');
}