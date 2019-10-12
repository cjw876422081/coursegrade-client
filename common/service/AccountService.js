import request from '../../components/pocky-request/index.js';
/**
 * 用户注册
 */
export default class AccountService{
	constructor() {
		    this.request=new request();
		}
    register(managedUserVM){
		return this.request.post({
			url:'/api/register',
			data:managedUserVM,
			contentType:'json'
		})
	}
}