export function getActiveElement (state) {
    let el = state.activeElement;

    if(typeof el.group_index == 'undefined') return null;

    if(typeof el.layer_index == 'undefined'){
        return state.groups[el.group_index].slides[el.slide_index];
    }else{
        return state.groups[el.group_index].slides[el.slide_index].layers[el.layer_index];
    }
}