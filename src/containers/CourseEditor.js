import React from 'react'
import LessonTabs from "./LessonTabs";
import ModuleList from "./ModuleList";
import ModuleEditor from "./ModuleEditor";

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

    render(){
        return(
            <div className='container-fluid'>
                {/*<nav className="navbar navbar-expand" style={{backgroundColor:'#e3f2fd'}}>*/}
                    {/*<a className="navbar-brand">Editing the Course: # {this.state.courseId}</a>*/}
                {/*</nav>*/}
                <div className="row">
                    <div  style={{backgroundColor:'#e3f2fd'}}>
                        <nav className="navbar navbar-light bg-light navbar-expand">
                            <a className="navbar-brand">Editing the Course: # {this.state.courseId}</a>
                        </nav>
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                </div>
            </div>
        )
    }
}