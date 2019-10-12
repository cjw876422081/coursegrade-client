import request from '../../components/pocky-request/index.js';

export default class CheckCourseContentHomeworkService{
	constructor() {
	    this.request=new request();
	}
	getCourseHomework(courseId){
		const requestParam={
			url:"/api/homework-grade/"+courseId,
		}
		return this.request.get(requestParam);
		
	}
}