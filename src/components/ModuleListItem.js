import React from 'react'
import { NavLink } from 'react-router-dom'

export default class ModuleListItem extends React.Component{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div>
                <NavLink to= {`/course/${this.props.courseId}/module/${this.props.moduleId}`}
                         style={{textDecoration:'none', display:'block', padding:'15px'}}
                         activeStyle={style}>
                    <li className="list-group-item" style={{paddingBottom:'25px'}} >
                            {this.props.title}
                        <span className="float-right">
                            <button className="btn btn-outline-danger"
                                    onClick={() => {if (window.confirm('Are you sure you wish to delete this module?'))
                                    {this.props.delete(this.props.moduleId)}}}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </span>
                    </li>
                </NavLink>
            </div>
        )
    }
}

let style={
    fontWeight:'bold',
    background:'#c4e4fc'
}