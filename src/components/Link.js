import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions";

const Link = ({widget, linkURLChanged, linkTextChanged, preview, widgetNameChanged}) => {
    let linkElem
    let linkTextElem
    let widgetNameElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <input onChange={() => linkURLChanged(widget.id, linkElem.value)}
                           ref={node => linkElem = node}
                           value={widget.linkURL}
                           className='form-control'
                           placeholder='URL'/><br/>
                    <input onChange={() => linkTextChanged(widget.id, linkTextElem.value)}
                           ref={node => linkTextElem = node}
                           value={widget.linkText}
                           className='form-control'
                           placeholder='Link Text'/><br/>
                    <input onChange={() => widgetNameChanged(widget.id, widgetNameElem.value)}
                           ref={node => widgetNameElem = node}
                           value={widget.widgetNameText}
                           className="form-control"
                           placeholder="Widget Name"
                           type="text"/>
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
    linkTextChanged: (widgetId, linktext) => actions.linkTextChanged(dispatch, widgetId, linktext),
    widgetNameChanged: (widgetId, widgetname)=> actions.widgetNameChanged(dispatch, widgetId, widgetname)
})

const stateToPropsMapperLink = state => ({
    preview: state.preview
})

export const LinkContainer = connect(stateToPropsMapperLink,dispatchToPropsMapperLink)(Link)