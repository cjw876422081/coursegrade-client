/**
 * 笔记实体类
 */
export default class CourseHomework {
	constructor(args) {
	    this.noteType='';
		this.noteMemo="";
		this.noteTime=new Date();
		this.publishUser='';
		this.courseId=0;
		this.planId=0;
		this.homeworkId=0;
		this.pid=0;
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