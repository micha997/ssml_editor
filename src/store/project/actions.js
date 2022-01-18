import exampleProject from '../../components/projectExample.json'

export function CreateProject (context, title) {
    context.commit('clearProject');
    context.commit('updateTitle', title);
}

export function LoadProjectFromFile (context, project) {
    context.commit('updateTitle', project.title);
    context.commit('updateTTSSettings', project.tts_settings);
    context.commit('updateGroups', project.groups);
}

export function LoadExampleProject (context) {
    context.commit('updateTitle', exampleProject.title);
    context.commit('updateTTSSettings', exampleProject.tts_settings);
    context.commit('updateGroups', exampleProject.groups);
}

export function SetActiveElement (context, {groupID, slideID, layerID}) {
    context.commit('setGroupID', groupID);
    context.commit('setSlideID', slideID);
    context.commit('setLayerID', layerID);
    context.commit('updateActive');
}