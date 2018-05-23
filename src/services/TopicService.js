let _singleton = Symbol();
const TOPIC_API_URL =
    'http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic';
const DEL_TOPIC_API_URL =
    'http://localhost:8080/api/topic';

class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        return fetch(
            TOPIC_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId)
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    createTopic(courseId, moduleId,lessonId, topic) {
        return fetch(TOPIC_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId),
            {   body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteTopic(topicId) {
        console.log('delete ' + topicId);
        return fetch(DEL_TOPIC_API_URL + '/' + topicId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })

    }
}
export default TopicService;