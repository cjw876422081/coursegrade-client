/**
* 创建课程
* 表单获取用户输入的：课程编号、课程名、课时数、周课时数、课程描述，自动填充创建时间、创建人。
*/

<template>
	<!-- <view class="window">
		<view class="pictureUpload">
			这里是课程封面上传区域(我太难了T_T)
		</view>
		
	</view> -->
	<view style="width:92vw;padding:0 4vw;">
	<form @submit="formSubmit">
		<view class="uni-form-item uni-column">
			<view class="title">课程代码</view>
			<view>
				<input class="uni-input formitem" :class="{'formerror':courseCodeError}" name="courseCode" placeholder="请输入课程代码" />
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">课程名称</view>
			<view>
				<input class="uni-input formitem" :class="{'formerror':courseNameError}" name="courseName" placeholder="请输入课程名称" />
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">课时数</view>
			<view>
				<input class="uni-input formitem" name="courseCount" placeholder="请输入课时数" />
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">周课时</view>
			<view>
				<input class="uni-input formitem" name="courseWeekCount" placeholder="请输入周课时数" />
			</view>
		</view>
		<view class="uni-form-item uni-column uni-textarea">
			<view class="title">课程描述</view>
			<textarea class="uni-input formitem" placeholder="课程描述"  name="courseMemo"/>
		</view>
		<!-- <view class="courseInformation">
			
				<view class="courseInformationImput">
					<label class="lable">课程号：</label>
					<input class="input" name="courseCode" placeholder="未设置" type="number" confirm-type="next" />
				</view>
				<view class="courseInformationImput">
					<label class="lable">课程名：</label>
					<input class="input" name="courseName" placeholder="未设置" type="text" confirm-type="next" />
				</view>
				<view class="courseInformationImput">
					<label class="lable">课时数：</label>
					<input class="input" name="courseCount" placeholder="未设置" type="number" confirm-type="next" />
				</view>
				<view class="courseInformationImput">
					<label class="lable">周课时：</label>
					<input class="input" name="courseWeekCount" placeholder="未设置" type="number" confirm-type="done" />
				</view>
				<view class="courseInformationLable">
					<label class="lable" style="font-weight: 700;">课程描述：</label>
				</view>
				<view class="courseInformationText">
					<textarea class="textarea" name="courseMemo"></textarea>
				</view>
			
		</view> -->
		<view class="submit">
			<button type="primary"  form-type="submit">提交课程信息</button>
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
	/* .window {
		width: 750rpx;
		height: 94vh;
		background: url(../../static/img/createClass.png);
		background-size: 95%;
	}
	.pictureUpload {
		width: 750rpx;
		height: 170px;
		line-height: 20px;
		text-align: center;
		border: 0.3px solid rgba(187, 187, 187, 1);
	}

	.courseInformation {}

	.courseInformationImput {
		width: 750rpx;
		height: 7vh;
		line-height: 20px;
		display: flex;
		flex-direction: row;
		text-align: center;
		align-items: center;
		border: 0.3px solid rgba(187, 187, 187, 1);
	}

	.lable {
		width: 250rpx;
		text-align: center;
	}

	.input {
		background: #FFFFFF;
		opacity: 0.7;
		width: 475rpx;
		height: 5vh;
		font-size: 14px;
		text-align: right;
		padding-right: 1vw;
		font-family: Microsoft Yahei;
		border: 0.5px solid rgba(187, 187, 187, 1);
	}

	.textarea {
		background: #FFFFFF;
		width: 90vw;
		margin-left: 5vw;
		border: 0.5px solid rgba(187, 187, 187, 1);
	}

	.courseInformationLable {
		width: 750rpx;
		height: 6vh;
		padding-left: 3vw;
	}

	.courseInformationText {
		width: 750rpx;
		height: 30vh;
		line-height: 20px;
		opacity: 0.7;
	} */
	.submit{
		margin-top:20rpx;
	}
</style>

<script>
	import CourseService from "../../common/service/CourseService.js"
	export default {
		data() {
			return {
				courseService:new CourseService(),
				courseCodeError:false,
				courseNameError:false,
				courseCountError:false,
				courseWeekCountError:false,
				courseMemoError:false,
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
				this.courseService.createCourse(formData).then((result)=>{
					console.log("course formSubmit callback",result);
					if(result.data && result.data.id>0){
						uni.showToast({
						    icon:'success',
						    title: "课程创建成功"
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
				this.courseCodeError=false;
				this.courseNameError=false;
				let errItem={
					errorText:"",
					error:false
				}
				let result=true;
				if(formData.courseCode==null || formData.courseCode.length==0){
					errItem.error=true;
					errItem.errorText="请输入课程代码";
					this.courseCodeError=true;
					result= false;
				}
				if(formData.courseName==null || formData.courseName.length==0){
					errItem.error=true;
					errItem.errorText="请输入课程名称";
					this.courseNameError=true;
					result= false;
				}
				return result;
			}
		}
	}
</script>
