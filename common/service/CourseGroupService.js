import request from '../../components/pocky-request/index.js';
/**
 * 创建班级数据
 */
export default class CourseGroupService{
	constructor() {
	    this.request=new request();
	}
	getCreateGroup(param,courseInfo){
		console.log("getCreateGroup param",param);
		const requestParam={
			url:'/api/course-groups/courseInfoId?courseInfoId='+courseInfo,
		}
		if(param){
			Object.assign(requestParam,{data:param});
		}
		return this.request.post(requestParam);
	}
	
}