import request from '../../components/pocky-request/index.js';
/**
 * 提交作业数据交互服务
 */
export default class StudentHomeworkService{
	constructor() {
	    this.request=new request();
	}
	
	getStudentHomework(studentHomeworkId){
		console.log("getStudentHomework studentHomeworkId",studentHomeworkId);
		const url='/api/student-homeworks/'+studentHomeworkId;
		return this.request.get({url:url});
	}
	updateStudentHomeworkGrade(studentHomeworkId,grade){	
		const url="/api/student-homeworks/id/grade?id="+studentHomeworkId+"&grade="+grade;
		return this.request.put({url:url}); 
	}
}