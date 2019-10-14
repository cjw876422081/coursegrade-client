

/*
 * 班级内学生实体类型
 */
 
 export default class StudentHomework{
	 constructor(args){
	 	 this.student="";
		 this.joinTime=new Date();
		 this.groupId=0;
	
	 /*
	  * @param {Object} args 初始化对象值
	  */
	 if(args){
	 	//如果使用对象调用构造，默认将初始化对象与当前对象合并
	 	Object.assign(this,args);
	 	console.log("StudentCourseGroup args init merge result",args);
	 }
	 
	 }
 }
 
