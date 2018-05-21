import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './examples/hello'
import CourseManager from './containers/CourseManager'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import Stateless from "./components/Stateless";
import ModuleList from "./containers/ModuleList";
import ModuleListItem from "./components/ModuleListItem";
import App from './examples/App'

ReactDOM.render(
    <div>
        {/*<App/>*/}
        <CourseManager/>
        {/*<ModuleList/>*/}
        {/*<Stateless message="Hello there. I'm a Stateless message!"/>*/}
    </div>,
    document.getElementById('root')
);
