/**
 * 课程实体类型
 */
export default class CourseInfo {
	constructor(args) {
	    this.courseCode='';
		this.courseName='';
		this.courseCount=0;
		this.courseWeekCount=0;
		this.courseMemo="";
		this.dataTime=new Date();
		this.courseUser="";
		/**
		 * @param {Object} args 初始化对象值
		 */
		if(args){
			//如果使用对象调用构造，默认将初始化对象与当前对象合并
			Object.assign(this,args);
			console.log("CourseInfo args init merge result",args);
		}
		
	}
	
}