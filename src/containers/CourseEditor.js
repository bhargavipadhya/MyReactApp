import React from 'react'
import ModuleList from "./ModuleList";

export default class CourseEditor
    extends React.Component{
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: '',title:''};
    }
    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse
        (newProps.match.params.courseId);
    }

    render(){
        return(
            <div>
                <div className='container-fluid'>
                    <div style={{backgroundColor:'#e3f2fd'}}>
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                </div>
            </div>
        )
    }
}