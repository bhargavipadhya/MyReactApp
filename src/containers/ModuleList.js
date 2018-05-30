import React from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import CourseService from "../services/CourseService";


export default class ModuleList
    extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            courseId: '',
            module: { title: ''},
            modules: [],
            course:{}
        };

        this.setCourse = this.setCourse.bind(this);
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;
    }

    deleteModule(moduleId){
        this.moduleService
            .deleteModule(moduleId)
            .then(() => { this.findAllModulesForCourse(this.state.courseId); });
    }


    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setCourse(this.state.courseId);

    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
        this.setCourse(newProps.courseId);
    }

    setCourse(courseId) {
        this.courseService
            .findCourseById(courseId)
            .then((course)=>{ this.setState({course: course});});
    }

    createModule(){
        if(this.state.module.title == ""){
            var module ={
                title:"New Module"
            };
            this.moduleService
                .createModule(this.props.courseId, module)
                .then(()=>{this.findAllModulesForCourse(this.state.courseId); });
        }
        else{
            this.moduleService
                .createModule(this.props.courseId, this.state.module)
                .then(()=>{this.findAllModulesForCourse(this.state.courseId); });
        }
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules(){
        let modules = this.state.modules.map((module) => {
            return <ModuleListItem key={module.id}
                                   title={module.title}
                                   courseId={this.state.courseId}
                                   moduleId={module.id}
                                   delete={this.deleteModule}/>
        });
        return modules;
    }

    render() {
        return (
        <div>
            {/*<nav className="navbar navbar-light bg-light navbar-expand" style={{paddingLeft: '15px 15px'}}>*/}
                {/*<a className="navbar-brand">Course Editor for: {this.state.course.title}</a>*/}
            {/*</nav>*/}
            <br/>
            <h5 style={{paddingLeft:'15px'}}>Modules for course: {this.state.course.title}</h5>
            <table className="table">
                <tbody>
                    <tr>
                        <td><input className="form-control"
                                   value={this.state.module.title}
                                   placeholder="Enter Module"
                                   onChange={this.titleChanged}/></td>
                        <td><button className="btn btn-outline-primary mb-2"
                                    onClick={this.createModule}>
                            <i className="fa fa-plus"></i>
                        </button></td>
                    </tr>
                </tbody>
            </table>

            <ul className="list-group">
            {this.renderListOfModules()}
            </ul>
        </div>
    );
    }
}
