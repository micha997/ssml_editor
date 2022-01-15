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