import React from 'react'
import { Link } from 'react-router-dom'

export default class LessonTabItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <li className="nav-item ">
                        <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}`}> {/*topics*/}
                            &nbsp;&nbsp;{this.props.title}
                        </Link>
                        &nbsp;<button className="btn btn-danger float-right" style={{padding: '3px 3px'}}
                                      onClick={() => {if (window.confirm('Are you sure you wish to delete this Lesson?'))
                                             {this.props.delete(this.props.lessonId)}}}>
                            <i className="fa fa-trash"></i>
                    </button>
                    &nbsp;

                </li>
            </div>
        )
    }
}