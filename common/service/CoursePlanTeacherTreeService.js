import request from '../../components/pocky-request/index.js';
/**
 * 老师查询授课内容服务
 */
export default class CoursePlanTeacherTreeService {
	constructor() {
		this.request = new request();
	}
	getCoursePlanTeacherTree(pageParam, courseId) {
		const requestParam = {
			url: '/api/course-plans/tree' + "/" + courseId,
		}
		if (pageParam) {
			Object.assign(requestParam, {
				data: pageParam
			});
		}
		return this.request.get(requestParam);
	}
}
