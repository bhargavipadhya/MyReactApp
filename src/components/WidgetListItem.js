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
            {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
            <div className='form-group'>
                <input onChange={()=> headingTextChanged(widget.id, inputElem.value)}
                       ref={node => inputElem = node}
                       value={widget.text}
                       className="form-control"
                       placeholder='Heading Text'/><br/>

                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        ref={node => selectElem = node}
                        value={widget.size}
                        className="custom-select">
                    <option>Choose Heading Size</option>
                    <option value='1'>Heading 1</option>
                    <option value='2'>Heading 2</option>
                    <option value='3'>Heading 3</option>
                </select>
            </div>
            <h4 style={{padding:"10px"}}>Preview</h4>
        </div>
        <div style={{padding:"10px"}}>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
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
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <textarea onChange={() => paraTextChanged(widget.id, paraElem.value)}
                              ref={node => paraElem = node}
                              value={widget.paraText}
                              placeholder='Lorem Ipsum'
                              className='form-control'/>
                </div>
                <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
                {widget.widgetType === 'Paragraph' && <p>{widget.paraText}</p>}
            </div>
        </div>
    )
}

const dispatchToPropsMapperParagraph = dispatch => ({
    paraTextChanged: (widgetId, newParaText) => actions.paraTextChanged(dispatch, widgetId, newParaText)
})

const stateToPropsMapperParagraph = state => ({
    preview: state.preview
})

const ParaContainer = connect(stateToPropsMapperParagraph, dispatchToPropsMapperParagraph)(Paragraph)

const Image = ({widget, imageURLChanged, preview}) => {
    let imageElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <input onChange={() => imageURLChanged(widget.id, imageElem.value)}
                           ref={node => imageElem = node}
                           value={widget.imageURL}
                           className='form-control'/>
                </div>
                <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
                {widget.widgetType === 'Image' && <img src={widget.imageURL} style={{width:"200px",height:"200px"}}/>}
            </div>
        </div>
    )
}

const dispatchToPropsMapperImage = dispatch => ({
    imageURLChanged: (widgetId, url) => actions.imageURLChanged(dispatch, widgetId, url)
})

const stateToPropsMapperImage = state => ({
    preview: state.preview
})

const ImageContainer = connect(stateToPropsMapperImage,dispatchToPropsMapperImage)(Image)

const Link = ({widget, linkURLChanged, linkTextChanged, preview}) => {
    let linkElem
    let linkTextElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <input onChange={() => linkURLChanged(widget.id, linkElem.value)}
                           ref={node => linkElem = node}
                           value={widget.linkURL}
                           className='form-control'/><br/>
                    <input onChange={() => linkTextChanged(widget.id, linkTextElem.value)}
                           ref={node => linkTextElem = node}
                           value={widget.linkText}
                           className='form-control'/>
                </div>
                <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
                {widget.widgetType === 'Link' && <a href={widget.linkURL}>{widget.linkText}</a>}
            </div>
        </div>
    )
}

const dispatchToPropsMapperLink = dispatch => ({
    linkURLChanged: (widgetId, linkurl) => actions.linkURLChanged(dispatch, widgetId, linkurl),
    linkTextChanged: (widgetId, linktext) => actions.linkTextChanged(dispatch, widgetId, linktext)
})

const stateToPropsMapperLink = state => ({
    preview: state.preview
})

const LinkContainer = connect(stateToPropsMapperLink,dispatchToPropsMapperLink)(Link)

const List = ({widget, listTextChanged, listTypeChanged, preview}) => {
    let listTextElem
    let listTypeElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <textarea onChange={() => listTextChanged(widget.id, listTextElem.value)}
                              ref={node => listTextElem = node}
                              value={widget.listText}
                              className='form-control'/><br/>
                    <select onChange={() => listTypeChanged(widget.id, listTypeElem.value)}
                            ref={node => listTypeElem = node}
                            value={widget.listType}
                            className='custom-select'>
                        <option>Unordered List</option>
                        <option>Ordered List</option>
                    </select>
                </div>
                <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
                {widget.listType === 'Unordered List' && <UnorderedList key={widget.id} stringlist={widget.listText}/>}
                {widget.listType === 'Ordered List' && <OrderedList key={widget.id} stringlist={widget.listText}/>}
            </div>
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

const stateToPropsMapperList = state => ({
    preview: state.preview
})

const ListContainer = connect(stateToPropsMapperList,dispatchToPropsMapperList)(List)


class WidgetListItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let selectElement;
        return(
            <div className='border border-dark rounded' style={{padding: '15px'}}>
                <li>
                    <div hidden={this.props.previewMode}>

                        <div style={{width:'650px'}}>
                            <div style={{float:'left'}}>
                                <h2 style={{padding:"10px"}}>{this.props.widgetType}</h2>
                            </div>
                            <div style={{float:'right', padding:"7px", marginRight:'10px'}}>
                                <select value={this.props.widgetType}
                                        onChange={
                                            e => (this.props.dispatch({
                                                type:constants.SELECT_WIDGET_TYPE,
                                                id: this.props.widgetId,
                                                widgetType: selectElement.value}))
                                            }
                                        ref={node => selectElement = node}
                                        className='custom-select'>

                                    <option>Heading</option>
                                    <option>Paragraph</option>
                                    <option>Image</option>
                                    <option>List</option>
                                    <option>Link</option>
                                </select>
                                <button className='btn btn-danger' onClick={() => actions.deleteWidget(this.props.dispatch, this.props.widgetId, this.props.topicId)}>
                                    <i className="fa fa-times" style={{color: 'white'}}></i></button>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div>
                        {this.props.widgetType === 'Heading' && <HeadingContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'Paragraph' && <ParaContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'Image' && <ImageContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'Link' && <LinkContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'List' && <ListContainer widget={this.props.widget}/>}
                    </div>
                </li>
            </div>
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