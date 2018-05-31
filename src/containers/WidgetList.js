import React, {Component} from 'react'
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from '../components/WidgetListItem'
import * as constants from "../constants";
import ToggleButton from 'react-toggle-button'

class WidgetList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    componentWillReceiveProps(newProps){
       if(newProps.topicId !== this.props.topicId) {
           this.props.findWidgetByTopicId(newProps.topicId);
       }
    }

    render(){
    return(
        <div>
            <div className="float-right row" style={{marginTop:"15px", marginRight:'20px'}}>
                <div className='col-4' style={{paddingRight:'20px', paddingLeft:'0px'}}>
                    <button hidden={this.props.previewMode}
                            onClick={() => this.props.save(this.props.topicId)}
                            className='btn btn-success'>Save</button>
                </div>
                <div className='col-8' style={{paddingRight: '0px', paddingLeft: '20px'}}>
                    <b>Preview</b>
                    <ToggleButton onClick={() => this.props.preview(this.props.topicId)}
                                  value={this.props.previewMode}/>
                </div>
            </div>
            <br/>
            <div style={{marginTop:"40px"}} className="container-fluid">
                <ul style={{paddingLeft:'0px'}}>
                    {this.props.widgets.map(widget=> (
                        <WidgetContainer key={widget.id}
                                         text={widget.text}
                                         widgetId={widget.id}
                                         widgetType={widget.widgetType}
                                         widget={widget}
                                         preview={this.props.previewMode}
                                         topicId={this.props.topicId}/>
                    ))}
                </ul>
            </div>
                <button onClick={() => this.props.addWidget(this.props.topicId)}
                className='btn btn-danger float-right'
                style={{marginRight:'30px'}}><i className="fa fa-plus-circle"></i></button>
        </div>
    )}
}


const dispatcherToPropsMapper = dispatch => {
    return({
        addWidget: (topicId) => actions.addWidget(dispatch, topicId),
        save: (topicId) => actions.save(dispatch, topicId),
        preview: (topicId) => actions.preview(dispatch, topicId),
        findWidgetByTopicId: (topicId) => actions.findWidgetByTopicId(dispatch, topicId)
    })
}

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

export const App = connect(stateToPropsMapper,dispatcherToPropsMapper)(WidgetList)
