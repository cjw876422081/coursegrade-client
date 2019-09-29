import request from './request';
import TOKEN_INFO from '../../common/constant.js';

// 设置全局配置
request.prototype.setConfig({
    url: '',  // 基地址
    // // contentType: 'json',
    // header: {
    //     uid: 'xxxx'
    // }
});

// 全局拦截器
request.prototype.addGlobalInterce({
    // 请求拦截器 (例如配置token)
    // return false或者不return值, 都不会发送请求
    request (config) {
        console.log('this is global request interceptors', config)
        const tokenInfo=uni.getStorageSync("tokenInfo");
		if(config.url.indexOf("/api/authenticate")<0){
			console.log("需要添加令牌到请求中",tokenInfo,"token",TOKEN_INFO)
			if(tokenInfo && tokenInfo.id_token){
				config.header.Authorization="Bearer " + tokenInfo.id_token
			}
		}
        console.log('this is global request changed', config)
        return config;
        // return false;
    },

    // 响应拦截器 (例如根据状态码拦截数据)
    // return false或者不return值 则都不会返回值
    // return Promise.reject('xxxxx')，主动抛出错误
    response (res) {
        let firstCodeNum = String(res.statusCode).substr(0, 1);
        console.log('📫 is global response interceptors', res)

        // 2xx
        if (firstCodeNum === '2') {
            // do something
            // res.data.data.text = 'addGlobalInterce response'

            return res;
        }

        // 3xx
        if (firstCodeNum === '3') {
            // do something
            return res;
        }

        // 4xx or 5xx
        if (firstCodeNum === '4' || firstCodeNum === '5') {
            // do something
            console.log('is 4xx or 5xx')
			if(parseInt(res.statusCode)===401){
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
            return Promise.reject(res)
        }

        // 停止发送请求 request.stop()
        if (JSON.stringify(res) === '{"errMsg":"request:fail abort"}') {
            // do something
            // return Promise.reject('xxxxxxxxx');
            return false;
        }

        // return Promise.reject(res)
        return res;
    }
});

export default request