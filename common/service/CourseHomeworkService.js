import request from '../../components/pocky-request/index.js';
/**
 * 发布作业数据交互服务
 */
export default class CourseHomeworkService{
	constructor() {
	    this.request=new request();
	}
	createCourseHomework(courseHomework){
		return this.request.post({
			url:'/api/course-homeworks',
			data:courseHomework,
			contentType: 'json'
		})
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
	getOneHomework(id){
		const requestParam={
			url:'/api/course-homeworks/'+id,	
		}
		return this.request.get(requestParam);
	}
}