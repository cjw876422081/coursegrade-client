/**
 * 创建班级
 *
 */
<template class="main-content">
	<view style="width:92vw;padding:0 4vw;">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">班级号</view>
				<view>
					<input class="uni-input formitem" :class="{'formerror':groupCodeError}" name="groupCode" placeholder="请输入班级号" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">班级名称</view>
				<view>
					<input class="uni-input formitem" :class="{'formerror':groupNameError}" name="groupName" placeholder="请输入班级名称" />
				</view>
				<view class="submit">
					<button type="primary"  form-type="submit">创建班级</button>
				</view>
			</view>
		</form>
	</view>
</template>

<style>
	.formitem{
		border:1px solid rgba(0,122,255,0.5);
		border-radius: 10rpx;
		margin:0 auto;
	}
	.formitem.formerror{
		border:1px solid rgba(255,0,0,0.5) !important;
	}
	.submit{
		
		margin-top:20rpx;
	}
</style>
<script>
	import CourseGroupService from "../../common/service/CourseGroupService.js"
	export default {
		data() {
			return {
				coursegroupService:new CourseGroupService(),
				groupCodeError:false,
				groupNameError:false,
			}
		},
		methods: {
			formSubmit(e){
				console.log("group formSubmit",e);
				const formData=e.detail.value;
				const validResult=this.formValid(formData);
				if(!validResult){
					uni.showToast({
						icon:'none',
						title:"输入数据不合法"
					});
					return;
				}
				this.coursegroupService.getCreateGroup(formData,5).then((result)=>{
					console.log("group formSubmit callback",result);
					if(result.data && result.data.id>0){
						uni.showToast({
							icon:'success',
							title: "班级创建成功"
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
					this.groupCodeError=false;
					this.groupNameError=false;
					let errItem={
						errorText:"",
						error:false
					}
					let result=true;
					if(formData.groupCode==null || formData.groupCode.length==0){
						errItem.error=true;
						errItem.errorText="请输入班级号";
						this.groupCodeError=true;
						result= false; 
					}
					if(formData.groupName==null || formData.groupName.length==0){
						errItem.error=true;
						errItem.errorText="请输入班级名称";
						this.groupNameError=true;
						result= false;
					}
					return result;
			}
			
		}
	}
</script>


