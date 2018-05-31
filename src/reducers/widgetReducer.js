import * as constants from "../constants";

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState
    switch (action.type) {

        case constants.ADD_WIDGET:
            let newstate = {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length +1,
                        widgetType: 'Heading',
                        size: '1',
                        widgetNameText: '',
                        topicId: action.topicId
                    }
                ],
                topicId: action.topicId,
                preview: state.preview
            }
            return newstate;

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )),
                topicId: action.topicId
            }

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            return newState

        case constants.FIND_WIDGET_BY_TOPIC_ID:
            return {
                widgets: action.widgets,
                topicId: action.topicId
            }

        case constants.SAVE_WIDGETS:
            fetch('http://localhost:8080/api/topic/TID/widget/save'.replace('TID', action.topicId), {
                method: 'POST',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            })
            return state;

        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id){
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.PREVIEW_WIDGET:
            return {
                widgets: state.widgets,
                topicId: action.topicId,
                preview: !state.preview
            }

        case constants.PARA_TEXT_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.paraText = action.paraText
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.IMAGE_URL_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.imageURL = action.imageURL
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LINK_URL_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.linkURL = action.linkURL
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LINK_TEXT_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.linkText = action.linkText
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_TEXT_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.listText = action.listText
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_TYPE_CHANGED:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.WIDGET_NAME:
            return {
                widgets:state.widgets.map(widget => {
                if (widget.id === action.id){
                    widget.widgetNameText = action.widgetNameText
                }
                return Object.assign({},widget);
            })
        }

        default:
            return state
    }
}
