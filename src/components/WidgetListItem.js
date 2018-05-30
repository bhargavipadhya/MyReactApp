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

const Paragraph = ({widget, paraTextChanged, preview}) => {
    let paraElem
    return (
        <div>
            <div hidden={preview}>
                <h2>Paragraph</h2>
                <textarea onChange={() => paraTextChanged(widget.id, paraElem.value)}
                          ref={node => paraElem = node}
                          value={widget.paraText}/>
                <p>Preview Section:</p>
            </div>
            {widget.widgetType === 'Paragraph' && <p>{widget.paraText}</p>}
        </div>
    )
}

const dispatchToPropsMapperParagraph = dispatch => ({
    paraTextChanged: (widgetId, newParaText) => actions.paraTextChanged(dispatch, widgetId, newParaText)
})

const ParaContainer = connect(null, dispatchToPropsMapperParagraph)(Paragraph)

const Image = ({widget, imageURLChanged, preview}) => {
    let imageElem
    return(
        <div>
            <div hidden={preview}>
                <h2>Image</h2>
                <input onChange={() => imageURLChanged(widget.id, imageElem.value)}
                       ref={node => imageElem = node}
                       value={widget.imageURL}/>
                <p>Preview Section:</p>
            </div>
            {widget.widgetType === 'Image' && <img src={widget.imageURL} style={{width:"200px",height:"200px"}}/>}
        </div>
    )
}

const dispatchToPropsMapperImage = dispatch => ({
    imageURLChanged: (widgetId, url) => actions.imageURLChanged(dispatch, widgetId, url)
})

const ImageContainer = connect(null,dispatchToPropsMapperImage)(Image)

const Link = ({widget, linkURLChanged, linkTextChanged, preview}) => {
    let linkElem
    let linkTextElem
    return(
        <div>
            <div hidden={preview}>
                <h2>Link</h2>
                <input onChange={() => linkURLChanged(widget.id, linkElem.value)}
                       ref={node => linkElem = node}
                       value={widget.linkURL}/>
                <input onChange={() => linkTextChanged(widget.id, linkTextElem.value)}
                       ref={node => linkTextElem = node}
                       value={widget.linkText}/>
                <p>Preview Section:</p>
            </div>
            {widget.widgetType === 'Link' && <a href={widget.linkURL}>{widget.linkText}</a>}
        </div>
    )
}

const dispatchToPropsMapperLink = dispatch => ({
    linkURLChanged: (widgetId, linkurl) => actions.linkURLChanged(dispatch, widgetId, linkurl),
    linkTextChanged: (widgetId, linktext) => actions.linkTextChanged(dispatch, widgetId, linktext)
})

const LinkContainer = connect(null,dispatchToPropsMapperLink)(Link)

const List = ({widget, listTextChanged, listTypeChanged, preview}) => {
    let listTextElem
    let listTypeElem
    return(
        <div>
            <div hidden={preview}>
                <h2>List</h2>
                <textarea onChange={() => listTextChanged(widget.id, listTextElem.value)}
                          ref={node => listTextElem = node}
                          value={widget.listText}/>
                <select onChange={() => listTypeChanged(widget.id, listTypeElem.value)}
                        ref={node => listTypeElem = node}
                        value={widget.listType}>
                    <option>Unordered List</option>
                    <option>Ordered List</option>
                </select>
                <p>Preview Section:</p>
            </div>
            {widget.listType === 'Unordered List' && <UnorderedList key={widget.id} stringlist={widget.listText}/>}
            {widget.listType === 'Ordered List' && <OrderedList key={widget.id} stringlist={widget.listText}/>}

        </div>
    )
}

const UnorderedList = ({stringlist}) => {
    return (
        <ul>
            {stringlist.split("\n").map(item => (
                <li>{item}</li>
            ))}
        </ul>
    )
}


const OrderedList = ({stringlist}) => {
    return (
        <ol>
            {stringlist.split("\n").map(item => (
                <li>{item}</li>
            ))}
        </ol>
    )
}

const dispatchToPropsMapperList = dispatch => ({
    listTextChanged: (widgetId, listtext) => actions.listTextChanged(dispatch, widgetId, listtext),
    listTypeChanged: (widgetId, type) => actions.listTypeChanged(dispatch, widgetId, type)
})

const ListContainer = connect(null,dispatchToPropsMapperList)(List)


class WidgetListItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let selectElement;
        return(
            <li>
                <div hidden={this.props.previewMode}>
                    ({this.props.widgetId}): {this.props.widgetType}
                        <select value={this.props.widgetType}
                                onChange={
                                    e => (this.props.dispatch({
                                    type:constants.SELECT_WIDGET_TYPE,
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

                        <button onClick={() => actions.deleteWidget(this.props.dispatch, this.props.widgetId, this.props.topicId)}>
                            Delete</button>
                </div>
                <div>
                    {this.props.widgetType === 'Heading' && <HeadingContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'Paragraph' && <ParaContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'Image' && <ImageContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'Link' && <LinkContainer widget={this.props.widget}/>}
                    {this.props.widgetType === 'List' && <ListContainer widget={this.props.widget}/>}
                </div>
            </li>
        )
    }
}



const dispatcherToPropsMapper = dispatch => ({
    //deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    // selectWidgetType: (widgetId, selectElementValue) => actions.selectWidgetType(dispatch, widgetId, selectElementValue),
    // findAllWidgets: () => actions.findAllWidgets(dispatch),
})

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode:state.preview
})

const WidgetContainer = connect(stateToPropsMapper)(WidgetListItem)

export default WidgetContainer