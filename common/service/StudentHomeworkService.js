import request from '../../components/pocky-request/index.js';
/**
 * 提交作业数据交互服务
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
	getStudentHomework(studentHomeworkId){
		console.log("getStudentHomework studentHomeworkId",studentHomeworkId);
		const url='/api/student-homeworks/'+studentHomeworkId;
		return this.request.get({url:url});
	}
	updateStudentHomeworkGrade(studentHomework){
		console.log("-------updateStudentHomeworkGrade updateStudentHomeworkGrade",studentHomework);
		
		const requestParam={
			url:"/api/student-homeworks"
		}
		if(studentHomework){
			Object.assign(requestParam,{data:studentHomework});
		}
		return this.request.put(requestParam);
	}
	submitHomework(studentHomeworkInfo){
		return this.request.post({
			url:'/api/student-homeworks',
			data:studentHomeworkInfo,
			contentType:'json'
		})
	}
}

