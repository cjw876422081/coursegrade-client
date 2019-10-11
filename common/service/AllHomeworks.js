import request from '../../components/pocky-request/index.js';
/**
 * 所有家庭作业
 */
export default class HomeworksService{
	constructor() {
	    this.request=new request();
	}
	getHomeworks(pageParam){
		console.log("getHomeworks pageParam",pageParam);
		const requestParam={
			url:'/api/course-homeworks',
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
	}
	
}