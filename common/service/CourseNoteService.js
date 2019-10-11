import request from '../../components/pocky-request/index.js';
/**
 * 课程数据交互服务
 */
export default class CourseNoteService{
	constructor() {
	    this.request=new request();
	}

	getHomeworkNotes(entityId,pageParam,type){
		/* const url='/api/course-notes/type?type='+type+'&entityId='+entityId+'&pageable='+pageParam;
		return this.request.get({url:url}); */
		
		const requestParam={
			url:'/api/course-notes/type?type='+type+'&entityId='+entityId,
		}
		if(pageParam){
			Object.assign(requestParam,{data:pageParam});
		}
		return this.request.get(requestParam);
		/* const requestParam={
			url:'/api/course-notes/type',
		}
		if(pageParam){
			Object.assign(requestParam,{data:type,entityId,pageParam});
		}
		return this.request.get(requestParam); */
	}
	
	createNote(courseNote){
		return this.request.post({
			url:'/api/course-infos/',
			data:courseNote,
			contentType: 'json'
		})
	}
	delNote(noteId){
		const url="/api/course-infos/"+noteId;
		return this.request.delete({url:url});
	}
}