import request from '../../components/pocky-request/index.js';
/**
 * 课程数据交互服务
 */
export default class CourseService{
	constructor() {
	    this.request=new request();
	}
	getTeacherCourses(pageParam){
		console.log("getTeacherCourses pageParam",pageParam);
		const requestParam={
			url:'/api/course-infos/teacher',
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
	}
	createCourse(courseInfo){
		
	}
	delCourse(courseId){
		const url="/api/course-infos/"+courseId;
		return this.request.delete({url:url});
	}
	
}