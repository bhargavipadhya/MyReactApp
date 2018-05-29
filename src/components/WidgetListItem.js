import React, {Component} from 'react'
import * as constants from "../constants";
import {connect} from 'react-redux'
import * as actions from "../actions";

const Heading = ({widget, headingTextChanged, headingSizeChanged, preview}) => {
    let selectElem
    let inputElem
    return(
    <div>
        <div hidden={preview}>
            <h2> Heading {widget.size}</h2>
            <input onChange={()=> headingTextChanged(widget.id, inputElem.value)}
                   ref={node => inputElem = node}
                   value={widget.text}/>

            <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                    ref={node => selectElem = node}
                    value={widget.size}>
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
            </select>
                <p>Preview Section:</p>
        </div>
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
    </div>
)}

const dispatchToPropsMapperHeading = dispatch => ({
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch,widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
})

const stateToPropsMapperHeading = state => ({
    preview: state.preview
})

const HeadingContainer = connect(stateToPropsMapperHeading, dispatchToPropsMapperHeading)(Heading)

const Paragraph = ({widget, paraTextChanged}) => {
    let paraElem
    return (
        <div>
            <h2>Paragraph</h2>
            <textarea onChange={() => paraTextChanged(widget.id, paraElem.value)}
                      ref={node => paraElem = node}
                      value={widget.paraText}/>
            {/*put paraText in model*/}
            {widget.widgetType === 'Paragraph' && <p>{widget.paraText}</p>}
        </div>
    )
}

const dispatchToPropsMapperParagraph = dispatch => ({
    paraTextChanged: (widgetId, newParaText) => actions.paraTextChanged(dispatch, widgetId, newParaText)
})

const ParaContainer = connect(null, dispatchToPropsMapperParagraph)(Paragraph)

const Image = ({widget, imageURLChanged}) => {
    let imageElem
    return(
        <div>
            <h2>Image</h2>
            <input onChange={() => imageURLChanged(widget.id, imageElem.value)}
                   ref={node => imageElem = node}
                   value={widget.imageURL}/>
            {/*put imageURL in model*/}
            {widget.widgetType === 'Image' && <img src={widget.imageURL}/>}
        </div>
    )
}

const dispatchToPropsMapperImage = dispatch => ({
    imageURLChanged: (widgetId, url) => actions.imageURLChanged(dispatch, widgetId, url)
})

const ImageContainer = connect(null,dispatchToPropsMapperImage)(Image)

const Link = ({widget, linkURLChanged}) => {
    let linkElem
    return(
        <div>
            <h2>Link</h2>
            <input onChange={() => linkURLChanged(widget.id, linkElem.value)}
                   ref={node => linkElem = node}
                   value={widget.linkURL}/>
            {/*put linkURL in model*/}
            {widget.widgetType === 'Link' && <a href={widget.linkURL}/>}
        </div>
    )
}

const dispatchToPropsMapperLink = dispatch => ({
    linkURLChanged: (widgetId, linkurl) => actions.linkURLChanged(dispatch, widgetId, linkurl)
})

const LinkContainer = connect(null,dispatchToPropsMapperLink)(Link)

const List = () => {
    return(
        <div>
            <h2>List</h2>
            <textarea></textarea>
        </div>
    )
}

class WidgetListItem extends Component {
    constructor(props){
        super(props);
        //this.props.findAllWidgets()
    }

    render(){
        return(
            <li>
                <div hidden={this.props.previewMode}>
                    ({this.props.widgetId}): {this.props.widgetType}
                        <select value={this.props.widgetType}
                                onChange={
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
                            <option>Link</option>
                        </select>

                        <button onClick = {this.props.deleteWidget(this.props.widgetId)}>
                            {/*e => (this.props.dispatch({type: constants.DELETE_WIDGET, id: this.props.widgetId}))}>*/}
                            Delete</button>
                </div>
                <div>
                    {this.props.widgetType === 'Heading' && <HeadingContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'Paragraph' && <ParaContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'Image' && <ImageContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'Link' && <LinkContainer widget={this.props.widget}/>}
                </div>
            </li>
        )
    }
}



const dispatcherToPropsMapper = dispatch => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    // selectWidgetType: (widgetId, selectElementValue) => actions.selectWidgetType(dispatch, widgetId, selectElementValue),
    // findAllWidgets: () => actions.findAllWidgets(dispatch),
    preview: (topicId,previewMode) => actions.preview(topicId,previewMode,dispatch)
})

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode:state.preview
})

const WidgetContainer = connect(stateToPropsMapper,dispatcherToPropsMapper)(WidgetListItem)

export default WidgetContainer
let selectElement
//const selectElementValue = selectElement.value