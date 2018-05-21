import React from 'react'
import { Link } from 'react-router-dom'

export default class ModuleListItem extends React.Component{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <li className="list-group-item" style={{hover:{display: 'block'}}}>
                <Link to= {`/course/${this.props.courseId}/module/${this.props.moduleId}`}>
                    {this.props.title}
                </Link>
                <span className="float-right">
                     <button className="btn btn-primary">
                         <i className="fa fa-pencil"></i>
                    </button>&nbsp;
                    <button className="btn btn-danger"
                            onClick={() => {if (window.confirm('Are you sure you wish to delete this module?'))
                            {this.props.delete(this.props.moduleId)}}}>
                        <i className="fa fa-trash"></i>
                    </button>
                </span>
            </li>
        )
    }
}