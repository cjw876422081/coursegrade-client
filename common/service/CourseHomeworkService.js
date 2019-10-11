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
}