import request from '../../components/pocky-request/index.js';

export default class StudentCourseGroupService{
	constructor() {
	    this.request=new request();
	}

	getStudentCourseGroup(CourseGroupId,pageParam){
		console.log("getstudentCourseGroup studentCourseGroupId",CourseGroupId);
		const requestParam={
			url:"/api/student-course-groups/id?id="+CourseGroupId+"&pageable="+pageParam,
		}
		return this.request.get(requestParam);
	}
	checkCourseClassList(course_id){
		console.log("checkCourseClassList course_id",course_id);
		const requestParam={
			url:"/api/student-course-order-group/"+course_id,
		}
		return this.request.get(requestParam);
	}
}