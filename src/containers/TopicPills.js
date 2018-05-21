import React from 'react'
import TopicPillItem from "../components/TopicPillItem";
import TopicService from "../services/TopicService";

export default class TopicPills extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topics: [],
            topic: {title:''},
            moduleId:'',courseId:'',lessonId:''
        };

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.topicService = TopicService.instance;
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

    //topics
    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);//topics
        console.log("toh fir problem kya hai?");
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);//topics
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId)
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then((topics) => {this.setTopics(topics)});
    }

    renderListOfTopics(){
        let topics = this.state.topics.map((topic)=> {
            console.log("toh fir problem kya hai?")
            return <TopicPillItem key={topic.id}
                                  title={topic.title}/>
                                  // topicId={topic.id}
                                  // lessonId={this.state.lessonId}
                                  // courseId={this.state.courseId}//topics
                                  // moduleId={this.state.moduleId}/>//topics
        });
        return topics;
    }

    render(){
        return(
            <div>
                <ul>
                    {this.renderListOfTopics()}
                </ul>
            </div>
        )
    }
}