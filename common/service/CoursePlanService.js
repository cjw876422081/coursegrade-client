import request from '../../components/pocky-request/index.js';
export default class CoursePlanService {
	constructor() {
	    this.request=new request();
	}
	createCoursePlan(CoursePlan){
		return this.request.post({
			url:'/api/course-plans',
			data:CoursePlan,
			contentType: 'json'
		})
	}
	
}