import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions";

const Image = ({widget, imageURLChanged, preview, widgetNameChanged}) => {
    let imageElem
    let widgetNameElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <input onChange={() => imageURLChanged(widget.id, imageElem.value)}
                           ref={node => imageElem = node}
                           value={widget.imageURL}
                           className='form-control'
                           placeholder='Image URL'/><br/>
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
                {widget.widgetType === 'Image' && <img src={widget.imageURL} style={{width:"200px",height:"200px"}}/>}
            </div>
        </div>
    )
}

const dispatchToPropsMapperImage = dispatch => ({
    imageURLChanged: (widgetId, url) => actions.imageURLChanged(dispatch, widgetId, url),
    widgetNameChanged: (widgetId, widgetname)=> actions.widgetNameChanged(dispatch, widgetId, widgetname)
})

const stateToPropsMapperImage = state => ({
    preview: state.preview
})

export const ImageContainer = connect(stateToPropsMapperImage,dispatchToPropsMapperImage)(Image)