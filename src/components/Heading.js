import * as actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Heading = ({widget, headingTextChanged, headingSizeChanged, preview, widgetNameChanged}) => {
    let selectElem
    let inputElem
    let widgetNameElem
    return(
        <div>
            <div hidden={preview}>
                <div className='form-group'>
                    <input onChange={()=> headingTextChanged(widget.id, inputElem.value)}
                           ref={node => inputElem = node}
                           value={widget.text}
                           className="form-control"
                           placeholder='Heading Text'/><br/>

                    <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                            ref={node => selectElem = node}
                            value={widget.size}
                            className="form-control">
                        <option>Choose Heading Size</option>
                        <option value='1'>Heading 1</option>
                        <option value='2'>Heading 2</option>
                        <option value='3'>Heading 3</option>
                    </select>
                    <br/>
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
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )}

const dispatchToPropsMapperHeading = dispatch => ({
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch,widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, widgetname)=> actions.widgetNameChanged(dispatch, widgetId, widgetname)
})

const stateToPropsMapperHeading = state => ({
    preview: state.preview
})

export const HeadingContainer = connect(stateToPropsMapperHeading, dispatchToPropsMapperHeading)(Heading)