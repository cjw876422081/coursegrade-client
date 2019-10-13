<template>
	<view class="content"
	      style="background-image: url('./static/img/1.jpg');
	      background-repeat: no-repeat;
	      background-size: cover;padding:0;">	
		
	    <view class="header ">			
	        <text>账户注册</text>		
	    </view>		
	   	<form @submit="formSubmit">	
	        <view class="input-group">					
	            <view class="input-row border">	
					<text class="title" style="width: 200rpx;">选择身份：</text>
	                <radio-group name="rolegroup" class="a-input">
				            <label class="radio"><radio value="student" />学生</label>
						    <label class="radio"><radio value="teacher" />教师</label>

					</radio-group>			
	            </view>	
	            <view class="input-row border" :class="{'bordererror':accountError}">			    		    
	                <text class="title" style="width: 200rpx;">账    号：</text>		        
	                <input class="a-input" type="text" placeholder="请输入账号" name="account" />		   
	            </view>		     
			    <view class="input-row border" :class="{'bordererror':passwordError}">			   
	                <text class="title" style="width: 200rpx;">密    码：</text>			    
	                <input  class="a-input"  password type="text"  placeholder="请输入密码" name="password"/>		    
	            </view>		    
	            <view class="input-row border" :class="{'bordererror':repasswordError}">			    
	                <text class="title" style="width: 200rpx;">确认密码：</text>			    
	                <input  class="a-input" password type="text" placeholder="确认密码" name="repassword" />		    
	            </view>		    
	            <view class="btn-row">		        
	                <button type="primary" class="default" size="default" form-type="submit" >保存</button>		    
	            </view>		
	        </view>		
	    </form>
	 </view>
</template>

<script>
	import AccountService from "../../common/service/AccountService.js"
	export default {
		data() {
			return {
				accountService:new AccountService(),
				accountError:false,
				passwordError:false,
				repasswordError:false,
				rolegroupError:false
				
			}
		},
		methods:{
			formSubmit(e){
				console.log("register formSubmit",e);
				const formData=e.detail.value;
				const validResult=this.formValid(formData);
				if(!validResult){
					uni.showToast({
					icon:'none',
					title: "输入数据不合法"
					});
					return;
				}
				let roleStr="ROLE_ADMIN";
				if(formData.rolegroup=="student"){
					roleStr="ROLE_USER";
				}
				const sendData={
					activated: true,
					authorities: [
					    roleStr
					  ],
					email:"email@email.com",
					firstName:formData.account,
					login: formData.account,
					password: formData.password
				};
				this.accountService.register(sendData).then((result)=>{
					console.log("account formSubmit callback",result);
						uni.showToast({
							icon:'success',
							title:"注册成功"
						});
						setTimeout(()=>{
							console.log("settime out")
							uni.navigateBack();
						},1500);
					
				}).catch((error)=>{
					
				}).finally(()=>{
					
				})
			},
			formValid(formData){
				this.accountError=false;
				this.passwordError=false;
				this.repassword=false;
				this.rolegroupError=false;
				let errItem = {
					errorText: "",
					error: false
				}
				let result=true;
				if(formData.account==null || formData.account.length==0){
					errItem.error=true;
					errItem.errorText="请输入账号";
					this.accountError=true;
					result=false;
				}
				if(formData.password == null || formData.password.length ==0){
					errItem.error=true;
					errItem.errorText="请输入密码";
					this.passwordError=true;
					result=false;
				}
				if(formData.repassword == null || formData.repassword.length ==0){
					errItem.error=true;
					errItem.errorText="请再次输入密码";
					this.repasswordError=true;
					result=false;
				}

				if(formData.password != formData.repassword){
					result=false;
				}
				return result;
			}
			
			},
			}
</script>


<style>
	.header{			
		font-size: 150%;			
		width:100%;			
		text-align: center;			
		color:black;			
		margin-top:10vh;			
		margin-bottom:10vh;			
		z-index:3;			
		font-weight:600;	
	}
    .input-group{		
		background-color:transparent;		
		z-index: 3;		
		margin-bottom:10vh;	
	}
	.a-input{ 
      margin-top: 15rpx;			
	}
	.border {
		border: 1px solid rgba(0, 122, 255, 0.5);
		border-radius: 10rpx;
		margin: 0 auto
	}
	.border.bordererror {
		border: 1px solid rgba(255, 0, 0, 0.5) !important;
		
	}
	
</style>
