import * as constants from "../constants";

export const widgetReducer = (state = {widgets: []}, action) => {
    let newState
    switch (action.type) {

        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length +1, text: 'New Widget', widgetType: 'Heading'}
                ]
            }


        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }


        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            return newState

        case constants.SAVE_WIDGETS:
            console.log("save")
            fetch('http://localhost:8080/api/topic/TID/widget/save'.replace('TID',action.topicId),{
            method:'POST',
            body:JSON.stringify(state.widgets),
            headers:{
                'content-type': 'application/json'
            }});

            return state;

        case 'SELECT_WIDGET_TYPE':
            console.log(action)
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id){
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))

        default:
            return state
    }
}
