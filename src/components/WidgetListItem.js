import React, {Component} from 'react'
import * as constants from "../constants";
import {connect} from 'react-redux'
import * as actions from "../actions";

import {HeadingContainer} from "./Heading";
import {ParaContainer} from "./Paragraph";
import {ListContainer} from './List'
import {LinkContainer} from "./Link";
import {ImageContainer} from "./Image";

class WidgetListItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let selectElement;
        return(
            <div className='border border-dark rounded' style={{padding: '15px'}}>
                <div>
                    <div hidden={this.props.previewMode}>
                            <div style={{float:'left'}}>
                                <h2 style={{padding:"10px"}}>{this.props.widgetType}</h2>
                            </div>
                            <div className='row float-right' style={{marginRight:'18px',paddingTop:"10px"}}>
                                <div className='col-2' style={{paddingRight:'5px', paddingLeft:'0px'}}>
                                    <button className='btn btn-warning'
                                            style={{paddingRight:'10px'}}>
                                        <i className="fa fa-arrow-up"></i>
                                    </button>
                                </div>
                                <div className='col-2' style={{paddingRight:'0px', paddingLeft:'5px'}}>
                                    <button className='btn btn-warning'
                                            style={{paddingLeft:'10px'}}>
                                        <i className="fa fa-arrow-down"></i>
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <select value={this.props.widgetType}
                                            onChange={() => this.props.selectWidgetType(this.props.widgetId, selectElement.value)
                                                // e => (this.props.dispatch({
                                                //     type:constants.SELECT_WIDGET_TYPE,
                                                //     id: this.props.widgetId,
                                                //     widgetType: selectElement.value}))
                                                }
                                            ref={node => selectElement = node}
                                            className='form-control'>

                                        <option>Heading</option>
                                        <option>Paragraph</option>
                                        <option>Image</option>
                                        <option>List</option>
                                        <option>Link</option>
                                    </select>
                                </div>
                                <div className='col-2' style={{paddingLeft:'1px', paddingRight:'1px'}}>
                                <button className='btn btn-danger' onClick={() => this.props.deleteWidget(this.props.widgetId)
                                    //() => actions.deleteWidget(this.props.dispatch, this.props.widgetId, this.props.topicId)
                                }>
                                    <i className="fa fa-times" style={{color: 'white'}}></i></button></div>
                            </div>
                            <div className="clear"></div>
                    </div>
                    <div>
                        {this.props.widgetType === 'Heading' && <HeadingContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'Paragraph' && <ParaContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'Image' && <ImageContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'Link' && <LinkContainer widget={this.props.widget}/>}
                        {this.props.widgetType === 'List' && <ListContainer widget={this.props.widget}/>}
                    </div>
                </div>
            </div>
        )
    }
}

// function immutablySwapItems(items, firstIndex, secondIndex) {
//     const results= items.slice();
//     const firstItem = items[firstIndex];
//     results[firstIndex] = items[secondIndex];
//     results[secondIndex] = firstItem;
//
//     return results;
// }

const dispatcherToPropsMapper = dispatch => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    selectWidgetType: (widgetId, selectElementValue) => actions.selectWidgetType(dispatch, widgetId, selectElementValue)
})

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode:state.preview
})

const WidgetContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(WidgetListItem)

export default WidgetContainer