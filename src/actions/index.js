import * as constants from "../constants";

export const findAllWidgets = dispatch => (
    fetch('http://localhost:8080/api/widget')
        .then(response =>  (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
)

export const findWidgetByTopicId = (dispatch, topicId) => (
    fetch('http://localhost:8080/api/topic/TID/widget'.replace('TID',topicId))
        .then(response => (response.json()))
        .then(widgets => (dispatch(
            {
                type: constants.FIND_WIDGET_BY_TOPIC_ID,
                topicId: topicId,
                widgets: widgets
            }
        )))
)

export const addWidget = (dispatch, topicId) => (
        dispatch({
            type: constants.ADD_WIDGET,topicId})
    )

export const deleteWidget = (dispatch, id, topicId) => {
    return(
        dispatch({
            type:constants.DELETE_WIDGET,
            id:id,
            topicId: topicId
        })
    )
}

export const save = (dispatch, topicId) => (
     dispatch({
         type: constants.SAVE_WIDGETS,
         topicId: topicId
     })
 )

export const preview = (dispatch, topicId) => (
    dispatch({
        type: constants.PREVIEW_WIDGET,
        topicId: topicId
    })
)

export const selectWidgetType =(dispatch, widgetId, selectElementValue) => (
    dispatch({
        type:constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: selectElementValue
    })
)

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
)

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)

export const paraTextChanged = (dispatch, widgetId, newParaText) => (
    dispatch({
        type: constants.PARA_TEXT_CHANGED,
        id: widgetId,
        paraText: newParaText
    })
)

export const imageURLChanged = (dispatch, widgetId, url) => (
    dispatch({
        type: constants.IMAGE_URL_CHANGED,
        id: widgetId,
        imageURL: url
    })
)

export const linkURLChanged = (dispatch, widgetId, linkurl) => (
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        linkURL: linkurl
    })
)

export const linkTextChanged = (dispatch, widgetId, linktext) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        linkText: linktext
    })
)

export const listTextChanged = (dispatch, widgetId, listtext) => (
    dispatch({
        type: constants.LIST_TEXT_CHANGED,
        id: widgetId,
        listText: listtext
    })
)

export const listTypeChanged = (dispatch, widgetId, type) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: type
    })
)

export const widgetNameChanged = (dispatch, widgetId, widgetname) => (
    dispatch({
        type:constants.WIDGET_NAME,
        id:widgetId,
        widgetNameText:widgetname
    })
)