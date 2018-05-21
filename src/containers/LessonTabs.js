import React from 'react'
import LessonTabItem from "../components/LessonTabItem";
import LessonService from "../services/LessonService";

export default class LessonTabs
    extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            moduleId:'',courseId:'',lessonId:'',//topics
            lesson:{title:''},
            lessons:[]
        }

        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);//topics
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
    }

    deleteLesson(lessonId){
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => { this.findAllLessonsForModule(this.state.courseId, this.state.moduleId); });
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId, this.props.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
            });
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    //topics
    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);//topics
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);//topics
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId)
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    renderListOfLessons(){
        let lessons = this.state.lessons.map((lesson)=> {
            return <LessonTabItem key={lesson.id}
                                  title={lesson.title}
                                  lessonId={lesson.id}
                                  courseId={this.state.courseId}//topics
                                  moduleId={this.state.moduleId}//topics
                                  delete={this.deleteLesson}/>
        });
        return lessons;
    }

        render() {
        return(
                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}
                &emsp;&emsp;&emsp;<li>
                    <input className="form-control"
                           value={this.state.lesson.title}
                           placeholder="Enter Lesson"
                           onChange={this.titleChanged}/>
                </li>&nbsp;
                <li>
                    <button className="btn btn-primary btn-block mb-2"
                                onClick={this.createLesson}>
                     <i className="fa fa-plus"></i>
                    </button>
                </li>
                </ul>

                );
    }
}
