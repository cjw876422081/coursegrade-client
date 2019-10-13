import request from '../../components/pocky-request/index.js';
/**
 * 
 */
export default class CreatedGroup{
	constructor() {
	    this.request=new request();
	}
	getAllCourseGroups(){
		console.log("getAllCourseGroups pageParam");
		const requestParam={
			url:'/api/course-groups',
		}
		return this.request.get(requestParam);
	}
	
}