import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {widgetReducer} from "../reducers/widgetReducer";
// import {WidgetContainer} from './components/widgetListItem'
import {App} from "../containers/WidgetList";
import WidgetList from "./WidgetList";

export default class WidgetListEditor extends React.Component{
    constructor(props){
        super(props);
        this.selectModule = this.selectModule.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
        this.state = {moduleId: '', courseId:'',lessonId:'', topicId: ''};
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

    selectTopic(topicId) {
        this.setState({topicId: topicId});
    }

    componentDidMount() {
        this.selectModule(this.props.match.params.moduleId);
        this.selectCourse(this.props.match.params.courseId);
        this.selectLesson(this.props.match.params.lessonId);
        this.selectTopic(this.props.match.params.topicId);
    }
    componentWillReceiveProps(newProps){
        this.selectModule
        (newProps.match.params.moduleId);
        this.selectCourse
        (newProps.match.params.courseId);
        this.selectLesson
        (newProps.match.params.lessonId);
        this.selectTopic
        (newProps.match.params.topicId);
    }

    render(){

        return(
            <div>
                <Provider store={store}>
                    <App topicId={this.state.topicId}/>
                </Provider>

            </div>
        )
    }
}
const store = createStore(widgetReducer)