<<<<<<< HEAD
<template>
    <view class="main-content" style="background-image: url('./static/img/createhomework-bg.png');
		background-repeat: no-repeat;background-color: rgb(230,230,240);
		background-size: 100% 100%;padding:0;">
		<form @submit="formSubmit" >
			<view class="input-group">
				<view class="input-row border">
					<text class="title">作业代码：</text>
					<input name="homeworkCode" :class="{'formerror':homeworkCodeError}" class="input" focus="true" placeholder="输入作业代码" />
				</view>
				<view class="input-row border">
					<text class="title">作业内容：</text>
					<textarea name="homeworkMemo" :class="{'formerror':homeworkMemoError}" focus="true" placeholder="输入作业内容" auto-height />
				</view>
				<view class="input-row border">
					<text class="title">作业目标：</text>
					<textarea name="homeworkTarget" :class="{'formerror':homeworkTargetError}" focus="true" placeholder="输入作业目标" auto-height/>
				</view>
				<view class="input-row border">
					<label class="title">作业分值：</label>
					<input name="homeworkGrade" :class="{'formerror':homeworkGradeError}" class="input" focus="true" placeholder="输入作业分值" type="number" />
				</view>
				<view class="input-row border">
					<label class="title">截止时间：</label>
					<input name="homeworkDeadline" :class="{'formerror':homeworkDeadlineError}" class="input" focus="true" placeholder="选择截止时间" ref="deadLine" @tap="toggleTab()" adjust-position="true" />
				</view>
				<!-- 时间选择组件 -->
				<yu-datetime-picker @confirm="onConfirm" ref="dateTime"></yu-datetime-picker>  
			</view>
			<button class="createBtn" form-type="submit">发布</button>
			
		</form>
    </view>
</template>

<script>
	import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	import CourseHomework from "../../common/model/CourseHomework.js";
	import CourseHomeworkService from "../../common/service/CourseHomeworkService.js";
	export default {
	    components: {
	        yuDatetimePicker,
	    },
	    data() {
	        return {
				courseHomeworkService:new CourseHomeworkService(),
				homeworkCodeError:false,
				homeworkMemoError:false,
				homeworkTargetError:false,
				homeworkGradeError:false,
				homeworkDeadlineError:false,
				//授课内容id，应从上一页面获取
				coursePlan:{id:1}
			}
	    },
	    methods: {
	        onConfirm(e) {
			    this.$refs.deadLine.value=e.selectRes
			},
			toggleTab(item, index) {  
				this.$refs.dateTime.show();  
			},
			formSubmit: function(e) {
				var formdata=e.detail.value;
				const validResult=this.formValid(formdata);
				if(!validResult){
					uni.showToast({
					    icon:'none',
					    title: "输入数据不合法"
					});
					return;
				} 
				
				formdata=Object.assign(formdata,{plan:this.coursePlan});
				/* uni.showModal({
					content: '表单数据内容：' + formdata,
					showCancel: true
				}); */
				console.log('form发生了submit事件，携带数据为：' + formdata);
				
				this.courseHomeworkService.createCourseHomework(formdata).then((result)=>{
					console.log("course formSubmit callback",result);
					if(result.data && result.data.id>0){
						uni.showToast({
						    icon:'success',
						    title: "作业发布成功"
						});
						setTimeout(()=>{
							console.log("settime out")
							uni.navigateBack();
						},1500); 
					}
				}).catch((error)=>{
					
				}).finally(()=>{
					
				});
			},
			formValid(formdata){
				this.homeworkCodeError=false;
				this.homeworkMemoError=false;
				this.homeworkTargetError=false;
				this.homeworkGradeError=false;
				this.homeworkDeadlineError=false;
				/* let errItem={
					errorText:"",
					error:false
				} */
				let result=true;
				if(formdata.homeworkCode==null || formdata.homeworkCode.length==0){
					this.homeworkCodeError=true;
					result= false;
				}
				if(formdata.homeworkMemo==null || formdata.homeworkMemo.length==0){
					this.homeworkMemoError=true;
					result= false;
				}
				if(formdata.homeworkTarget==null || formdata.homeworkTarget.length==0){
					this.homeworkTargetError=true;
					result= false;
				}
				if(formdata.homeworkGrade==null || formdata.homeworkGrade.length==0){
					this.homeworkGradeError=true;
					result= false;
				}
				if(formdata.homeworkDeadline==null || formdata.homeworkDeadline.length==0){
					this.homeworkDeadlineError=true;
					result= false;
				}
				return result;
			}
	    }
	};
</script>

<style>
	form{
		margin-top: 40vh;
	}
	.input-group{
		background: rgba(0,0,0,0);
	}
	.input-group .title{
		width:190rpx;
		color:#111;
	}
	.input-row{

	}
	.input.formerror{
		border:solid 1rpx rgba(255,0,0,0.5) !important;
	}
	textarea.formerror{
		border:solid 1rpx rgba(255,0,0,0.5) !important;
	}
	.input-group input{
		margin-top: 19rpx;
		width: 60vw;
	}
	.input-group textarea{
		margin-top: 19rpx;
		width: 60vw;
	}
	.createBtn{
		width: 80vw;
		margin: 10vh 10vw;
		background: rgba(220,220,220,0.5);
	}
</style>
=======
>>>>>>> cfa8ecda7b99dcd6de8b36bad52ae14acbd0a5ba
