import * as actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Paragraph = ({widget, paraTextChanged, preview, widgetNameChanged}) => {
    let paraElem
    let widgetNameElem
    return (
        <div>
            <div hidden={preview}>
                <div className='form-group'>
                    <textarea onChange={() => paraTextChanged(widget.id, paraElem.value)}
                              ref={node => paraElem = node}
                              value={widget.text}
                              placeholder='Paragraph Text'
                              className='form-control'/><br/>
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
                {widget.widgetType === 'Paragraph' && <p>{widget.text}</p>}
            </div>
        </div>
    )
}

const dispatchToPropsMapperParagraph = dispatch => ({
    paraTextChanged: (widgetId, newParaText) => actions.paraTextChanged(dispatch, widgetId, newParaText),
    widgetNameChanged: (widgetId, widgetname)=> actions.widgetNameChanged(dispatch, widgetId, widgetname)
})

const stateToPropsMapperParagraph = state => ({
    preview: state.preview
})

export const ParaContainer = connect(stateToPropsMapperParagraph, dispatchToPropsMapperParagraph)(Paragraph)