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
                                        className='form-control'>

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