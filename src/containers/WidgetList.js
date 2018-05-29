import React, {Component} from 'react'
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from '../components/WidgetListItem'
import * as constants from "../constants";

class WidgetList extends Component {
    constructor(props){
        super(props);
        this.props.findAllWidgets()
    }
    render(){
    return(
        <div>
            <p>Widget List {this.props.widgets.length}</p>
            <button onClick={this.props.save(this.props.topicId)}>Save</button>
            {/*<button onClick={()=>{this.props.preview(this.props.topicId,this.props.previewMode)}}>Preview</button>*/}
            <ul>
                {this.props.widgets.map(widget=> (
                    <WidgetContainer key={widget.id}
                                     text={widget.text}
                                     widgetId={widget.id}
                                     widgetType={widget.widgetType}
                                     widget={widget}/>
                                     // preview={this.props.previewMode}/>
                ))}
            </ul>
            <button onClick={this.props.addWidget}>Add Widget</button>
        </div>
    )}
}

const dispatcherToPropsMapper = dispatch => ({
    addWidget: () => actions.addWidget(dispatch),
    save: (topicId) => actions.save(dispatch, topicId),
    findAllWidgets: () => actions.findAllWidgets(dispatch)
})

const stateToPropsMapper = (state) => ({
    widgets: state.widgets
})

export const App = connect(stateToPropsMapper,dispatcherToPropsMapper)(WidgetList)
