
/*
 * 学生作业实体类型
 */
 
 export default class StudentHomework{
	 constructor(args){
	 	 this.submitMemo="";
		 this.submitTime=new Date();
		 this.readTime=new Date();
		 this.grade=0;
		 this.student="";
		 this.teacher="";
		 this.homeworkId=new CourseHomework();
	 /*
	  * @param {Object} args 初始化对象值
	  */
	 if(args){
	 	//如果使用对象调用构造，默认将初始化对象与当前对象合并
	 	Object.assign(this,args);
	 	console.log("StudentHomework args init merge result",args);
	 }
	 }
	 
	 setHomework(id){
	 	this.homework.setId(id);
	 }
	 
	 setSubmitMemo(submitMemo){
	 	this.submitMemo = submitMemo;
	 }
 }
 
