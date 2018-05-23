import React from 'react'
import TopicPillItem from "../components/TopicPillItem";
import TopicService from "../services/TopicService";
import LessonService from "../services/LessonService";

export default class TopicPills extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topics: [],
            topic: {title:''},
            moduleId:'',courseId:'',lessonId:'',topicId:'',
            lesson:{}
        };

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setLesson = this.setLesson.bind(this);
        this.topicService = TopicService.instance;
        this.lessonService = LessonService.instance;
    }

    titleChanged(event) {
        this.setState({topic: {title: event.target.value}});
    }

    setTopics(topics) {
        this.setState({topics: topics})
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

    setLesson(lessonId) {
        this.lessonService
            .findLessonById(lessonId)
            .then((lesson)=>{ this.setState({lesson: lesson});});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
        this.setLesson(this.state.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.setLesson(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId)
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then((topics) => {this.setTopics(topics)});
    }

    createTopic() {
        if(this.state.topic.title == ""){
            var topic ={
                title: "New Topic"
            };
            this.topicService
                .createTopic(this.props.courseId, this.props.moduleId, this.props.lessonId, topic)
                .then(() => {
                    this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId);
                });
        }
        else{
            this.topicService
                .createTopic(this.props.courseId, this.props.moduleId, this.props.lessonId, this.state.topic)
                .then(() => {
                    this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId);
                });
        }

    }

    deleteTopic(topicId){
        this.topicService
            .deleteTopic(topicId)
            .then(() => { this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId,this.state.lessonId); });
    }

    renderListOfTopics(){
        let topics = this.state.topics.map((topic)=> {
            return <TopicPillItem key={topic.id}
                                  title={topic.title}
                                  topicId={topic.id}
                                  delete={this.deleteTopic}/>
        });
        return topics;
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-light bg-light navbar-expand">
                    <a className="navbar-brand">Lesson Editor for: {this.state.lesson.title}</a>
                </nav>
                <ul className="nav nav-pills" style={{backgroundColor:'#e3f2fd', padding:'10px 5px'}}>
                    {this.renderListOfTopics()}
                    &emsp;&emsp;&emsp;<li>
                    <input className="form-control"
                           value={this.state.topic.title}
                           placeholder="Enter Topic"
                           onChange={this.titleChanged}/>
                </li>&nbsp;
                    <li>
                        <button className="btn btn-outline-primary btn-block mb-2"
                                onClick={this.createTopic}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}