import request from '../../components/pocky-request/index.js';
/**
 * 课程数据交互服务
 */
export default class StudentHomeworkService{
	constructor() {
	    this.request=new request();
	}
	getHomeworkSituation(homeworkId,pageParam){
			const requestParam={
				url:"/api/student-homeworks/id?id="+homeworkId+"&pageable="+pageParam
			}
			if(pageParam){
				Object.assign(requestParam,{data:pageParam});
			}
			return this.request.get(requestParam);
	}
	
}
