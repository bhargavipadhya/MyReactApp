let _singleton = Symbol();
const LESSON_API_URL =
    'http://localhost:8080/api/course/CID/module/MID/lesson';
const DEL_LESSON_API_URL =
    'http://localhost:8080/api/lesson';

class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(
            LESSON_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    findLessonById(lessonId) {
        return fetch(DEL_LESSON_API_URL + '/' + lessonId)
            .then(function(response){
                return response.json();
            });
    }

    createLesson(courseId, moduleId,lesson) {
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId),
            {   body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonId) {
        console.log('delete ' + lessonId);
        return fetch(DEL_LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })

    }
}
export default LessonService;