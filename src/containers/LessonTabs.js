import React from 'react'
import LessonTabItem from "../components/LessonTabItem";
import LessonService from "../services/LessonService";
import ModuleService from "../services/ModuleService";

export default class LessonTabs
    extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            moduleId:'',courseId:'',lessonId:'',
            lesson:{title:''},
            lessons:[],
            module:{}
        };

        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.setModule = this.setModule.bind(this);
        this.lessonService = LessonService.instance;
        this.moduleService = ModuleService.instance;
    }

    deleteLesson(lessonId){
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => { this.findAllLessonsForModule(this.state.courseId, this.state.moduleId); });
    }

    createLesson() {
        if(this.state.lesson.title == ""){
            var lesson ={
                title: "New Lesson"
            };
            this.lessonService
                .createLesson(this.props.courseId, this.props.moduleId,lesson)
                .then(() => {
                    this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
                });
        }
        else{
            this.lessonService
                .createLesson(this.props.courseId, this.props.moduleId, this.state.lesson)
                .then(() => {
                    this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
                });
        }

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

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setModule(moduleId) {
        this.moduleService
            .findModuleById(moduleId)
            .then((module)=>{ this.setState({module: module});});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
        this.setModule(this.state.moduleId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.setModule(newProps.moduleId);
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
                                  courseId={this.state.courseId}
                                  moduleId={this.state.moduleId}
                                  delete={this.deleteLesson}/>
        });
        return lessons;
    }

        render() {
        return(
            <div>
                <nav className="navbar navbar-light bg-light navbar-expand">
                    <a className="navbar-brand">Module Editor for: {this.state.module.title}</a>
                </nav>

                <ul className="nav nav-tabs" style={{backgroundColor:'#e3f2fd', padding:'10px 5px'}}>
                    {this.renderListOfLessons()}
                &emsp;&emsp;&emsp;<li>
                    <input className="form-control"
                           value={this.state.lesson.title}
                           placeholder="Enter Lesson"
                           onChange={this.titleChanged}/>
                </li>&nbsp;
                <li>
                    <button className="btn btn-outline-primary btn-block mb-2"
                                onClick={this.createLesson}>
                     <i className="fa fa-plus"></i>
                    </button>
                </li>
                </ul>
            </div>

                );
    }
}
