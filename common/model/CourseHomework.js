/**
 * 作业实体类
 */
export default class CourseHomework {
	constructor(args) {
		this.id=0;
	    this.homeworkCode='';
		this.homeworkMemo="";
		this.homeworkTarget='';
		this.homeworkGrade=0;
		this.homeworkDeadline=new Date();
		this.homeworkDataTime=new Date();
		this.planId=0;
		/**
		 * @param {Object} args 初始化对象值
		 */
		if(args){
			//如果使用对象调用构造，默认将初始化对象与当前对象合并
			Object.assign(this,args);
			console.log("CourseHomework args init merge result",args);
		}
		
	}
	
}