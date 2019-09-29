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
			url:'/api/course-infos/teacher'
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		this.request.get(requestParam).then((result)=>{
			console.log("CourseService getTeacherCourses",result)
		}).catch(err=>{
			
		}).finally(()=>{
			
		})
	}
	
}