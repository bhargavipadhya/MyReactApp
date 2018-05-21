import React from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';

export default class ModuleList
    extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            courseId: '',
            //moduleId:'',
            module: { title: ''},
            modules: []
        };

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
        //this.findAllModulesForCourse();
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule(){
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(()=>{this.findAllModulesForCourse(this.state.courseId); });
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules(){
        let modules = this.state.modules.map((module)=> {
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
        <div className="container-fluid">
            <br/>
            <h4>Modules for course:
                {this.state.courseId}</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <td><input className="form-control"
                                   value={this.state.module.title}
                                   placeholder="Enter Module"
                                   onChange={this.titleChanged}/></td>
                        <td><button className="btn btn-primary btn-block mb-2"
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
