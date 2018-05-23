import React from 'react'

export default class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="list-group-item">
                <a href="#">
                    {this.props.title}
                </a>
                &nbsp;<button className="btn btn-outline-danger float-right" style={{padding: '3px 3px'}}
                              onClick={() => {if (window.confirm('Are you sure you wish to delete this Lesson?'))
                              {this.props.delete(this.props.topicId)}}}>
                <i className="fa fa-trash"></i>
            </button>
            </li>
        )
    }
}