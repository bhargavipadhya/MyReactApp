import React, {Component} from 'react'
import CourseCard from '../components/CourseCard'
import ModuleList from "./ModuleList"
import LessonTabs from "./LessonTabs";
import CourseEditor from "./CourseEditor";
import CourseList from "./CourseList";
import ModuleEditor from "./ModuleEditor";
import {BrowserRouter as Router, Route}
    from 'react-router-dom'
import LessonEditor from "./LessonEditor";

class CourseManager extends Component {
    render(){
        return (
            <Router>
                <div className="container-fluid">
                    <Route path="/courses"
                           component={CourseList}>
                    </Route>

                    <div className="row">
                        <div className="col-4">
                        <Route path="/course/:courseId"
                               component={CourseEditor}>
                        </Route>
                        </div>
                        <div className="col-8">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}>
                        </Route>
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                               component={LessonEditor}>
                         </Route>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default CourseManager;