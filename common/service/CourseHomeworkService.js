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
	getOneHomework(homeworkId){
		const requestParam={
			url:'/api/course-homeworks/'+homeworkId,	
		}
		return this.request.get(requestParam);
	}
	/*查询单个授课内容作业 */
	getHomework(planId) {
		const requestParam = {
			url: '/api/homework-plan/'+planId,
		}
		return this.request.get(requestParam);
	}
	
	/*删除授课内容作业 根据作业id */
	delHomework(homeworkId) {
		const url= '/api/course-homeworks/'+homeworkId;
		return this.request.delete({url:url});
	}
}