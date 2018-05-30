import * as actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const List = ({widget, listTextChanged, listTypeChanged, preview, widgetNameChanged}) => {
    let listTextElem
    let listTypeElem
    let widgetNameElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2 style={{padding:"10px"}}>{widget.widgetType}</h2>*/}
                <div className='form-group'>
                    <textarea onChange={() => listTextChanged(widget.id, listTextElem.value)}
                              ref={node => listTextElem = node}
                              value={widget.listText}
                              className='form-control'
                              placeholder='Put each item in a separate row'/><br/>
                    <select onChange={() => listTypeChanged(widget.id, listTypeElem.value)}
                            ref={node => listTypeElem = node}
                            value={widget.listType}
                            className='form-control'>
                        <option>Unordered List</option>
                        <option>Ordered List</option>
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
    listTypeChanged: (widgetId, type) => actions.listTypeChanged(dispatch, widgetId, type),
    widgetNameChanged: (widgetId, widgetname)=> actions.widgetNameChanged(dispatch, widgetId, widgetname)
})

const stateToPropsMapperList = state => ({
    preview: state.preview
})

export const ListContainer = connect(stateToPropsMapperList,dispatchToPropsMapperList)(List)