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
	
	getStudentCourses(pageParam){
		console.log("getStudentCourses pageParam", pageParam);
		const requestParam={
			url:'/api/student-course-infos/student',
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
	}
	
	getAllCourses(){
		console.log("getAllCourses pageParam", pageParam);
		const requestParam={
			url:'/api/allcourse-infos',
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
		}
		
	createCourse(courseInfo){
		return this.request.post({
			url:'/api/course-infos/',
			data:courseInfo,
			contentType: 'json'
		})
	}
	delCourse(courseId){
		const url="/api/course-infos/"+courseId;
		return this.request.delete({url:url});
	}
	getCourseInfo(courseId){
		const requestParam={
			url:"/api/course-infos/"+courseId,
		}
		return this.request.get(requestParam);
	}
	getCourseHomework(courseId){
		const requestParam={
			url:"/api/course-homeworks/getAllTaskByCourse/"+courseId,
		}
		return this.request.get(requestParam);
		
	}
	delHomework(homeworkId){
		const url="/api/course-homeworks/"+homeworkId;
		return this.request.delete({url:url});
	}
	getCoursePlan(courseId,page,size,type){
		const requestParam={
			url:"/api/course-notes/type?entityId="+courseId+"&page="+page+"&size="+size+"&type="+type,
		}
		// if(courseId,pageParam,type){
		// 	Object.assign(requestParam,{data:courseId,pageParam,type});
		// }
		return this.request.get(requestParam);
		
	}
}