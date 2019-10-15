<<<<<<< HEAD
<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
=======

<template>
	<view style="width:92vw;padding:0 4vw;">
	<form @submit="formSubmit">
		<view class="uni-form-item uni-column uni-textarea">
			<view class="title">笔记内容</view>
			<textarea class="uni-input formitem" placeholder="笔记内容"  name="noteMemo"/>
		</view>
		<view class="submit">
			<button type="primary" form-type="submit">提交作业笔记信息</button>
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
	import CourseNoteService from "../../common/service/CourseNoteService.js"
	export default {
		data() {
			return {
				courseNoteService:new CourseNoteService(),
				noteMemoError:false,
				courseHomework:{id:0},
				noteType:'作业'
			}
		},
		methods: {
			formSubmit(e){
				console.log("course formSubmit",e);
				var formData=e.detail.value;
				const validResult=this.formValid(formData);
				if(!validResult){
					uni.showToast({
					    icon:'none',
					    title: "输入数据不合法"
					});
					return;
				}
				formData=Object.assign(formData,{noteType:this.noteType,
					                             homework:this.courseHomework});
				
				this.courseNoteService.createNote(formData).then((result)=>{
					console.log("course formSubmit callback",result);
					if(result.data && result.data.id>0){
						uni.showToast({
						    icon:'success',
						    title: "笔记创建成功"
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
				this.noteMemoError=false;
				let errItem={
					errorText:"",
					error:false
				}
				let result=true;
				if(formData.noteMemo==null || formData.noteMemo.length==0){
					errItem.error=true;
					errItem.errorText="请输入课程代码";
					this.noteMemoError=true;
					result= false;
				}
				return result;
			},
		},
		onLoad(option) {
			this.courseHomework.id=option.hId;
		}
	}
</script>
>>>>>>> d544234ec2e9b7d4b7f13874d96b2406da264040
