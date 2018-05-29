import React from 'react'
import { Link } from 'react-router-dom'

export default class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="list-group-item">
                <Link to= {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topicId}`}>
                    <a>
                        {this.props.title}
                    </a>
                </Link>
                &nbsp;<button className="btn btn-outline-danger float-right" style={{padding: '3px 3px'}}
                              onClick={() => {if (window.confirm('Are you sure you wish to delete this Lesson?'))
                              {this.props.delete(this.props.topicId)}}}>
                <i className="fa fa-trash"></i>
            </button>
            </li>
        )
    }
}