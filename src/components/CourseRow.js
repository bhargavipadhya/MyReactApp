import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>
                <td>
                    <i className="fa fa-book"></i> &nbsp;
                    <Link to= {`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td style={{color:"grey"}} align="justify"> me </td>
                <td>{this.props.course.modified}</td>
                <td>
                    <button className="btn btn-outline-danger"
                            onClick={() => {if (window.confirm('Are you sure you wish to delete this Course?'))
                    {this.props.delete(this.props.course.id)}}}>
                        Delete Course
                    </button>
                </td>
            </tr>
        )
    }
}
export default CourseRow;