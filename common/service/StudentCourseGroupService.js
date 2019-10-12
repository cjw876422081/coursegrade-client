import request from '../../components/pocky-request/index.js';

export default class StudentCourseGroupService{
	constructor() {
	    this.request=new request();
	}

	getStudentCourseGroup(CourseGroupId,pageParam){
		console.log("getstudentCourseGroup studentCourseGroupId",CourseGroupId);
		const requestParam={
			url:"/api/student-course-groups/id?id="+CourseGroupId
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
	}
}