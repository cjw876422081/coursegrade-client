<template>
	<view class="content" style="background-image: url('./static/img/9.jpg');
   		background-repeat: no-repeat;
   		background-size: cover;padding:0;overflow: hidden;">
		<view class="bgmask"></view>
		<view class="header"><text>授课评分系统</text></view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="default" size="10upx" @tap="bindLogin">登 录</button></view>
		<!-- <view class="btn-row">
   		   <button type="primary" plain="flase" class="default" size="10upx" @tap="bindLogin">GO</button>
   	   </view> -->

		<view class="btn-row"><button type="default" class="default" size="default" @tap="bindReg">注 册</button></view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import {
		TOKEN_INFO,
		USER_INFO
	} from '../../common/constant.js';
	import request from '../../components/pocky-request/index.js';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			};
		},
		onLoad() {
			const loginUser = uni.getStorageSync('loginuser');
			if (loginUser && loginUser.username) {
				this.account = loginUser.username;
				this.password = loginUser.password;

				//setTimeout(this.bindLogin(),1000);
			}
		},
		methods: {
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入登录账号'
					});
					return;
				}
				if (this.password.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}

				const data = {
					username: this.account,
					password: this.password
				};
				const req = new request();
				req.post({
						url: this.$authLoginUrl,
						data: data,
						contentType: 'json'
					})
					.then(res => {
						console.log('then', res);
						//将token存到本地
						uni.setStorageSync('tokenInfo', res.data);

						req.get({
							url: this.$accountUrl
						}).then(accountRes => {
							console.log('account is ', accountRes);
							const user = accountRes.data;
							uni.setStorageSync('userInfo', user);
							uni.setStorageSync('loginuser', data);
							const authorities = user.authorities;
							if (authorities && authorities.length > 0) {
								let flag = false;
								let role_type = "student";
								authorities.forEach(auth => {
									console.log(auth);
									if (auth === 'ROLE_ADMIN') {
										role_type = "teacher";

									}
								});
								this.toMain(role_type);

							} else {
								uni.showToast({
									icon: 'none',
									title: '账号未被许可'
								});
							}
						});
					})
					.catch(err => {
						console.log('catch', err);
					})
					.finally(() => {
						console.log('finally');
					});
			},
			bindReg() {
				uni.navigateTo({
					url: '../register/register'
				});
			},
			toMain(userName) {
				//如果是管理员，则是admin；如果是用户，则是user
				if (userName == 'teacher') {
					uni.navigateTo({
						url: '../teacherCourse/teacherCourse'
					});
				} else {
					uni.navigateTo({
						url: '../student/checkCourseInfo'
					});
				}

			}
		},
		toMain(userName) {
			uni.navigateTo({
				// url: '../teacherCourse/teacherCourse'
				url: '../groupStudent/groupStudent'
			});

		},
	
	onReady() {

	}
	}
</script>

<style>
	.header {
		font-size: 150%;
		width: 100%;
		text-align: center;
		color: #f1f1f1;
		margin-top: 10vh;
		margin-bottom: 10vh;
		z-index: 3;
		font-weight: 600;
	}

	.title {
		color: #ffffff;
		margin-left: 50rpx;
		size: a3;
	}

	.uni-input-placeholder {
		color: #ffffff;
		margin-left: 60rpx;
	}

	.bgmask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.input-group {
		background-color: transparent;
		z-index: 3;
		margin-bottom: 10vh;
	}

	.m-input {
		color: #333333;
	}

	.uni-input-input {
		color: #0faeff !important;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #333333;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #333333;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #333333;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}

	.btn-row {
		width: 140px;
		height: 150upx;
		margin-left: 200rpx;
		margin-top: -10px;
	}
</style>
