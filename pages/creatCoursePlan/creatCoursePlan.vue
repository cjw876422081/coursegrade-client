<template>
	<view class="content">	
	<p style="text-align: center;
			   margin-top: 20px;
			  font-size: 17px;">
		授课内容
	</p>
	<p style="
			  font-size: 22px;
			  margin-top: 50px;
			  margin-left: 62px;">
		课程名称:xx/xx
	</p>
		<view class="uni-title uni-common-pl"></view>
		        <view class="uni-title uni-common-pl"></view>
				<textarea class="MemoText" name="planMemo" placeholder-style="color:#888888" placeholder="授课内容:"/>
			
		
		<view class="uni-title uni-common-pl"></view>
		        <view class="uni-title uni-common-pl"></view>
				<textarea class="targetText" name="planTarget" placeholder-style="color:#888888" placeholder="授课目标:"/>
				
				
		<button type="primary" form-type="submit"
		style="left: 10px;
		top: 105px;
		width: 247px;
		height: 37px;
		border-radius: 4px;
		text-align: center;
		"
		>添加</button>
		
	</view>
</template>

<script>
	import CoursePlan from "../../common/model/CoursePlan.js";
	import CoursePlanService from "../../common/service/CoursePlanService.js";
export default {
    data() {
        return {
			CoursePlanService: new CoursePlanService(),
			planMemoError:false,
			planTargetError:false,
			}
    },
    methods: {
	 formSubmit(e){
	 		console.log("course formSubmit",e);
	 		const formData=e.detail.value;
	 		const validResult=this.formValid(formData);
	 		if(!validResult){
	 			uni.showToast({
	 			    icon:'none',
	 			    title: "输入数据不合法"
	 			});
	 			return;
	 		}
	 		this.CoursePlanService.createCoursePlan(formData).then((result)=>{
	 			console.log("coursePlan formSubmit callback",result);
	 			if(result.data && result.data.id>0){
	 				uni.showToast({
	 				    icon:'success',
	 				    title: "添加成功！"
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
	 		this.planMemoError=false;
	 		this.planTargetError=false;
	 		let errItem={
	 			errorText:"",
	 			error:false
	 		}
	 		let result=true;
	 		if(formData.planMemo==null || formData.planMemo.length==0){
	 			errItem.error=true;
	 			errItem.errorText="请输入授课内容！";
	 			this.planMemoError=true;
	 			result= false;
	 		}
	 		if(formData.planTarget==null || formData.planTarget.length==0){
	 			errItem.error=true;
	 			errItem.errorText="请输入授课目标";
	 			this.planTargetError=true;
	 			result= false;
	 		}
	 		return result;
	 	}
	 }
}
  
</script>


<style>

	.MemoText{
		background-color: white;
		left: 62px;
		top: 20px;
		width: 247px;
		height: 70px;
		line-height: 20px;
		color: rgba(136, 136, 136, 1);
		font-size: 14px;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);
		}
	.targetText{
		background-color: white;
		left: 62px;
		top: 50px;
		width: 247px;
		height: 70px;
		line-height: 20px;
		color: rgba(136, 136, 136, 1);
		font-size: 14px;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);
	}


</style>
