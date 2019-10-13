import request from '../../components/pocky-request/index.js';
/**
 * 单个课程笔记数据交互服务
 */
export default class CourseNoteByPlanTeacherService{
	constructor() {
	    this.request=new request();
	}
	getCourseNotes(courseId){
		const requestParam={
			url:"GET /api/course-notes/{id}"+courseId,
		// if(courseId,pageParam,type){
		// 	Object.assign(requestParam,{data:courseId,pageParam,type});
		}
		return this.request.get(requestParam);
		
	
	}
}