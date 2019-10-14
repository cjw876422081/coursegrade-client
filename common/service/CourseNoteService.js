import request from '../../components/pocky-request/index.js';
/**
 * 笔记数据交互服务
 */
export default class CourseNoteService{
	constructor() {
	    this.request=new request();
	}

	getHomeworkNotes(entityId,pageParam,type){
		const requestParam={
			url:'/api/course-notes/type?type='+type+'&entityId='+entityId,
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
	}
	createNote(courseNote){
		return this.request.post({
			url:'/api/course-notes',
			data:courseNote,
			contentType: 'json'
		})
	}
	delNote(noteId){
		const url="/api/course-infos/"+noteId;
		return this.request.delete({url:url});
	}
}