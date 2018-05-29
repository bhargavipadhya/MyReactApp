import React, {Component} from 'react'
import * as constants from "../constants";
import {connect} from 'react-redux'
import * as actions from "../actions";

const Heading = ({widget, headingTextChanged, headingSizeChanged}) => {
    let selectElem
    return(
    <div >
    <h2> Heading </h2>
    <select onChange={() => actions.headingSizeChanged(widget.id, selectElem.value)}
            ref={node => selectElem = node}
            value={widget.size}>
        <option>Heading 1</option>
        <option>Heading 2</option>
        <option>Heading 3</option>
    </select>
    </div>
)}

const dispatchToPropsMapper = dispatch => ({
    //headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch,widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)

const Paragraph = () => (
    <h2>Paragraph</h2>
)

class WidgetListItem extends Component {
    constructor(props){
        super(props);
        //this.props.findAllWidgets()
    }

    render(){
        return(
            <li>
                ({this.props.widgetId}): {this.props.widgetType}
                    <select value={this.props.widgetType}
                            onChange={
                                //this.props.selectWidgetType
                                e => (this.props.dispatch({
                                type:'SELECT_WIDGET_TYPE',
                                id: this.props.widgetId,
                                widgetType: selectElement.value}))
                            }
                            ref={node => selectElement = node}>
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>Image</option>
                        <option>List</option>
                        <option>VideoLink</option>
                    </select>

                    <button onClick = {() => (this.props.dispatch({type: constants.DELETE_WIDGET, id: this.props.widgetId}))}>
                        Delete</button>
                <div>
                    {this.props.widgetType === 'Heading' && <Heading/>}
                    {this.props.widgetType === 'Paragraph' && <Paragraph/>}
                </div>
            </li>
        )
    }
}


//
// const dispatcherToPropsMapper = dispatch => ({
//     deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId)
//     selectWidgetType: (widgetId, selectElementValue) => actions.selectWidgetType(dispatch, widgetId, selectElementValue),
//     findAllWidgets: () => actions.findAllWidgets(dispatch),
//     preview: (topicId,previewMode) => preview(topicId,previewMode,dispatch)
// })

// const stateToPropsMapper = (state) => ({
//     widgets: state.widgets,
//     previewMode:state.preview
// })

const WidgetContainer = connect()(WidgetListItem)

export default WidgetContainer
let selectElement
//const selectElementValue = selectElement.value