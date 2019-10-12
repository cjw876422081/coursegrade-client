/**
 * 用户实体类
 */
export default class Account {
	constructor(args) {
		this.authorities=[];
		this.login="";
		if(args){
			//如果使用对象调用构造，默认将初始化对象与当前对象合并
			Object.assign(this,args);
			console.log("Account args init merge result",args);
		}
	}
}