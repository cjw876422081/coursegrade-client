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
	            <view>				
	                <view class="input-row border">				    
	                    <xfl-select 
	                        :list="list"
	                        :clearable="false"
	                        :showItemNum="5" 
	                        :listShow="true"
	                        :isCanInput="true"  
	                        :style_Container="'height: 50px; font-size: 16px;background-color:transparent;'"
	                        :placeholder = "'请选择'"
	                        :selectHideType="'hideAll'">
	                    </xfl-select>				
	                </view>			
	            </view>		    
	            <view class="input-row border">			    
	                <text class="title" style="width: 200rpx;">账    号：</text>		        
	                <input class="a-input" type="text" placeholder="请输入账号" name="account" />		   
	            </view>		     
			    <view class="input-row border">			   
	                <text class="title" style="width: 200rpx;">密    码：</text>			    
	                <input  class="a-input"  password type="text"  placeholder="请输入密码" name="password"/>		    
	            </view>		    
	            <view class="input-row border">			    
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
				loginError:false,
				passwordError:false,
				repasswordError:false,
				
				 list: ['老师',
				        '学生',
                       ],	
			}
		},
		components: { xflSelect },  //注册为子组件
		methods:{
			bindPickerChange:function(e){
				this.index = e.target.value
			},
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
				this.accountService.register(formData).then((result)=>{
					console.log("account formSubmit callback",result);
					if(result.data && result.data.id>0){
						uni.showToast({
							icon:'success',
							title:"注册成功"
						});
						setTimeout(()=>{
							console.log("settime out")
							uni.navigateBack();
						},1500);
					}
				}).catch((error)=>{
					
				}).finally(()=>{
					
				})
			},
			formValid(formData){
				this.loginError=false;
				this.passwordError=false;
				this.repassword=false;
				let errItem={
					errorText:"",
					error:false
				}
				let result=true;
				if(formData.login==null || formData.login.length==0){
					errItem.error=true;
					errItem.errorText="请输入账号";
					this.loginError=true;
					result=false;
				}
				if(formData.password == null || formData.password ==0){
					errItem.error=true;
					errItem.errorText="请输入密码";
					this.passwordError=true;
					result=false;
				}
				if(formData.repassword == null || formData.repassword ==0){
					errItem.error=true;
					errItem.errorText="请再次输入密码";
					this.repasswordError=true;
					result=false;
				}
				if(formData.password.value != formData.repassword.value){
					errItem.error=true;
					errItem.errorText="两次密码不匹配";
					result=false;
				}
				return result;
			}
		}
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
	
</style>
