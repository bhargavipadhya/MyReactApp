import React, {Component} from 'react'
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from '../components/WidgetListItem'
import * as constants from "../constants";
import ToggleButton from 'react-toggle-button'

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
           actions.findWidgetByTopicId(this.props.dispatch,newProps.topicId);
       }
    }

    render(){
    return(
        <div>
            <div className="float-right" style={{marginRight:"20px",marginTop:"10px"}}>
                <button hidden={this.props.previewMode}
                        onClick={()=>actions.save(this.props.dispatch, this.props.topicId)}
                className='btn btn-success'>Save</button>
                <b>Preview</b>
                <ToggleButton onClick={()=>actions.preview(this.props.dispatch, this.props.topicId)} value={this.props.previewMode}/>
            </div>
            <br/>
            <div style={{marginTop:"40px"}} className="container-fluid">
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
            </div>
            <button onClick={()=>{
                actions.addWidget(this.props.dispatch,this.props.topicId)
                    }}
            className='btn btn-danger float-right'
            style={{marginRight:'20px'}}><i className="fa fa-plus-circle"></i></button>
        </div>
    )}
}


// const dispatcherToPropsMapper = dispatch => {
//     return({
//         //addWidget: () => alert("hello"),
//         // save: (topicId) => actions.save(dispatch, topicId),
//         //findAllWidgets: () => actions.findAllWidgets(dispatch),
//         preview: () => actions.preview(dispatch),
//         findWidgetByTopicId: (topicId) => actions.findWidgetByTopicId(dispatch, topicId)
//     })
// }

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

export const App = connect(stateToPropsMapper)(WidgetList)
