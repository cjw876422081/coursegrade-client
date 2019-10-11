/**
*授课内容实体表
*/
export default class CourseInfo{
	constructor(args) {
	   this.planMemo='';
	   this.planTarget='';
	   this.planCount=0;
	   this.dataTime=new Date();
	   this.parentPlanId=0;
	   this.courseId=0;
	   
	   if(args){
		   Object.assign(this,args);
		   concole.log("CreateCoursePlan args init merge result",args);
	   }
	}
}
