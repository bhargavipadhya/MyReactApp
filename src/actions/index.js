import * as constants from "../constants";

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({type: constants.HEADING_SIZE_CHANGED, id: widgetId, size: newSize})
)

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({type: constants.HEADING_TEXT_CHANGED, id: widgetId, text: newText})
)

export const paraTextChanged = (dispatch, widgetId, newParaText) => (
    dispatch({type: constants.PARA_TEXT_CHANGED, id: widgetId, paraText: newParaText})
)

export const imageURLChanged = (dispatch, widgetId, url) => (
    dispatch({type: constants.IMAGE_URL_CHANGED, id: widgetId, imageURL: url})
)

export const linkURLChanged = (dispatch, widgetId, linkurl) => (
    dispatch({type: constants.LINK_URL_CHANGED, id: widgetId, linkURL: linkurl})
)

export const findAllWidgets = dispatch => (
    fetch('http://localhost:8080/api/widget')
        .then(response =>  (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
)

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)

export const deleteWidget = (dispatch,widgetId) => (
    dispatch({type: constants.DELETE_WIDGET, widgetId: widgetId})
)

export const save = (dispatch, topicId) => (
    dispatch({type: constants.SAVE_WIDGETS, topicId: topicId})
)

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW_WIDGET})
)

// export const selectWidgetType =(dispatch, widgetId, selectElementValue) => (
//     dispatch({
//         type:'SELECT_WIDGET_TYPE',
//         id: widgetId,
//         widgetType: selectElementValue})
// )