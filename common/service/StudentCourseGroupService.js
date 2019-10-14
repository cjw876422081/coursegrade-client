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
	checkCourseClassList(course_id){
		console.log("checkCourseClassList course_id",course_id);
		const requestParam={
			url:"/api/student-course-order-group/"+course_id,
		}
		return this.request.get(requestParam);
	}

	getStudentName(pageParam){
		const requestParam={
			url:'/api/student-course-groups'
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam)
	}

		getCoursePlanTree(courseId) {
			console.log(courseId)
			const requestParam = {
				url: '/api/course-plans/tree/' + courseId,
			}
			return this.request.get(requestParam);
		}

		getCourseInfo(courseId){
			console.log(courseId)
			const requestParam={
				url:"/api/course-infos/"+courseId,
			}
			return this.request.get(requestParam);
		}
		IsJoinTheClass(){
			const requestParam = {
				url:'/api/student-course-group/student'
			}
			return this.request.get(requestParam);
		}
		joinTheClass(groupCode){
			const requestParam={
				url:"/api/student-course-group/groupId"+groupCode,
			}
			return this.request.post(requestParam);
		}
}