export default class CoursePlanService {
	constructor() {
	    this.request=new request();
	}
	// getCoursePlan(pageParam){
	// 	console.log("InsertCoursePlan pageParam",pageParam);
	// 	const requestParam={
	// 		url:'/api/course-plans',
	// 	}
	// 	if(pageParam){
	// 		Object.assign(requestParam,{data:pageParam});
	// 	}
	// 	return this.request.get(requestParam);
	// }
	createCoursePlan(coursePlan){
		return this.request.post({
			url:'/api/course-plans',
			data:coursePlan,
			contentType: 'json'
		})
	}
	
}