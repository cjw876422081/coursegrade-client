import request from '../../components/pocky-request/index.js';
/**
 * 创建班级数据
 */
export default class CourseGroupService{
	constructor() {
	    this.request=new request();
	}
	getCreateGroup(pageParam){
		console.log("getCreateGroup pageParam",pageParam);
		const requestParam={
			url:'/api/course-groups/courseInfoId',
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
	}
	
}