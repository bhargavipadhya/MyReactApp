import React from 'react'
import LessonTabs from "./LessonTabs";

export default class ModuleEditor extends React.Component{
    constructor(props) {
        super(props);
        this.selectModule = this.selectModule.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.state = {moduleId: '', courseId:'',lessonId:''};
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    selectLesson(lessonId) {
        this.setState({lessonId: lessonId});
    }
    componentDidMount() {
        this.selectModule(this.props.match.params.moduleId);
        this.selectCourse(this.props.match.params.courseId);
        this.selectLesson(this.props.match.params.lessonId);
    }
    componentWillReceiveProps(newProps){
        this.selectModule
        (newProps.match.params.moduleId);
        this.selectCourse
        (newProps.match.params.courseId);
        this.selectLesson
        (newProps.match.params.lessonId);
    }

    render(){
        return(
            <div>
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId} lessonId={this.state.lessonId}/>
            </div>
        )
    }
}