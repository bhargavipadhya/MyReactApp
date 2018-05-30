import React, {Component} from 'react'
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from '../components/WidgetListItem'
import * as constants from "../constants";

class WidgetList extends Component {
    constructor(props){
        super(props);
        //this.props.findAllWidgets()
        //actions.findAllWidgets(this.props.dispatch);
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
            <p>Widget List {this.props.widgets.length}</p>
            <button hidden={this.props.previewMode} onClick={()=>actions.save(this.props.dispatch, this.props.topicId)}>Save</button>
            <button onClick={()=>actions.preview(this.props.dispatch, this.props.topicId)}>Preview</button>
            <ul>
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
            <button onClick={()=>{
                actions.addWidget(this.props.dispatch, this.props.topicId)
            }}>Add Widget</button>
        </div>
    )}
}


const dispatcherToPropsMapper = dispatch => {
    return({
        //addWidget: () => alert("hello"),
        // save: (topicId) => actions.save(dispatch, topicId),
        //findAllWidgets: () => actions.findAllWidgets(dispatch),
        preview: () => actions.preview(dispatch),
        findWidgetByTopicId: (topicId) => actions.findWidgetByTopicId(dispatch, topicId)
    })
}

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

export const App = connect(stateToPropsMapper, dispatcherToPropsMapper)(WidgetList)
