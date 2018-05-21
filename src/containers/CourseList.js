import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: [],course:{title: '', created: '', modified:''}};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    //insert citation here: https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    getDateTime() {
        var current     = new Date();
        var year    = current.getFullYear();
        var month   = current.getMonth()+1;
        var day     = current.getDate();
        var hour    = current.getHours();
        var minute  = current.getMinutes();
        var second  = current.getSeconds();

        if(month.toString().length == 1) {
            var month = '0'+month;
        }
        if(day.toString().length == 1) {
            var day = '0'+day;
        }
        if(hour.toString().length == 1) {
            var hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            var minute = '0'+minute;
        }
        if(second.toString().length == 1) {
            var second = '0'+second;
        }
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
        return dateTime;
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses(){
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => { this.findAllCourses(); });
    }


    renderCourseRows() {
        let courses = null;

        if(this.state){
            courses = this.state.courses.map((course)=>{
               return <CourseRow key= {course.id} course={course}
                                 delete={this.deleteCourse}/>
            })
        }
        return (
            courses
        )
    }

    titleChanged(event) {
        this.setState({
            course: { title: event.target.value, created:this.getDateTime(), modified:this.getDateTime() }
        });

    }
    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between" style={{backgroundColor: "#e3f2fd"}}>
                    <a className="navbar-brand">Course Manager</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" id="titleFld"
                               placeholder="Course Name" aria-label="CourseName"
                               onChange={this.titleChanged}/>
                        <button className="btn btn-outline-primary my-2 my-sm-0"
                                onClick={this.createCourse}
                                type="button">Add Course</button>
                    </form>
                </nav>

                <table className="table table-striped">
                    <thead>
                    <tr><th>Title</th>
                    <th>Owned by</th>
                    <th>Last Modified</th>
                    <th></th></tr>

                    {/*<tr>*/}
                        {/*<th><input className="form-control" id="titleFld"*/}
                                   {/*placeholder="cs101"*/}
                                   {/*onChange={this.titleChanged}/></th>*/}
                        {/*<th><button className="btn btn-primary"*/}
                                    {/*onClick={this.createCourse}>Add Course</button></th>*/}
                    {/*</tr>*/}
                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
        </div>
        )
    }
}
export default CourseList;
