/**
* 创建课程
* 表单获取用户输入的：课程编号、课程名、课时数、周课时数、课程描述，自动填充创建时间、创建人。
*/

<template>
	<view class="window">
		<form @submit="formSubmit">
			<view class="uploadCover">
				<view>
					<robby-image-upload v-model="imageData" :server-url="serverUrl" fileKeyName="file" name="courseCover"></robby-image-upload>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">课程代码</view>
				<view>
					<input class="uni-input formitem" :class="{'formerror':courseCodeError}" type="number" name="courseCode"
					 placeholder="(必填)*" confirm-type="next" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">课程名称</view>
				<view>
					<input class="uni-input formitem" :class="{'formerror':courseNameError}" type="text" name="courseName" placeholder="(必填)*"
					 confirm-type="next" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">课时数</view>
				<view>
					<input class="uni-input formitem" :class="{'formerror':courseCountError}" type="number" name="courseCount"
					 placeholder="(必填)*" confirm-type="next" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">周课时</view>
				<view>
					<input class="uni-input formitem" :class="{'formerror':courseWeekCountError}" type="number" name="courseWeekCount"
					 placeholder="(必填)*" confirm-type="next" />
				</view>
			</view>
			<view class="title">课程描述:</view>
			<view class=" uni-textarea">
				<textarea class="uni-input formitem uni-form-item uni-column" :class="{'formerror':courseMemoError}" name="courseMemo"
				 placeholder="课程描述" confirm-type="done" />
				</view>
			<view class="submit">
				<button type="primary" form-type="submit">提交课程信息</button>
			</view>
		</form>
	</view>
</template>


<style>
	.formitem {
		border: 1px solid rgba(0, 122, 255, 0.5);
		border-radius: 10rpx;
		margin: 0 auto
	}

	.formitem.formerror {
		border: 1px solid rgba(255, 0, 0, 0.5) !important;
	}
	
	.window {
		padding:0 4vw;
		width: 750rpx;
		height: 100vh;
		background: url(http://47.97.195.181:9900/file/admin/44086426-3de8-4cee-bf44-2ab491af5132.png);
		background-size: 100% 100%;
	}
	.uploadCover{
		height: 15vh;
	}
	.title{
		font-weight: 750;
	}
	.submit {
			margin-top: 20rpx;
		}
</style>

<script>

	import CourseService from "../../common/service/CourseService.js"
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
	export default {
		components: {robbyImageUpload},	
		data() {			
			return {
				courseService: new CourseService(),
				courseCodeError: false,
				courseNameError: false,
				courseCountError: false,
				courseWeekCountError: false,
				courseMemoError: false,
				imageData:[],
				serverUrl:"/api/file/upload"				
			}
		},
		
		methods: {				
			formSubmit(e) {//从form表单中获取结果 e
				console.log("course formSubmit", e);//控制台中打印结果e的详细信息
				const formData = e.detail.value;//将结果e中detail目录下的value中的信息录入formData中
				const validResult = this.formValid(formData);//将从提取出的formData信息提交给formValid方法判断是否合法，并将判断结果赋值给validResult
				if (!validResult) {//判断结果validResylt，若为false则弹出uni组件中的showToast弹框提示"请填写完整的课程信息"并return空结束,为true则执行下面的代码
					uni.showToast({
						icon: 'none',
						title: "请填写完整的课程信息"
					});
					return;
				}
				this.courseService.createCourse(formData)//调用courseService中的createCourse方法，将提取出的有效信息formData传给创建课程的接口
				.then((result) => {//.then(返回值)方法可以保证上面的创建语句执行完后再执行下面的代码，避免了执行下面语句时还没有收到返回值的情况
					console.log("course formSubmit callback", result);//控制台打印创建课程操作的返回值
					if (result.data && result.data.id > 0) {//判断返回值中的data字段是否存在，如果存在则其中的id属性是否>0(如果创建成功，数据库会自动给id赋值)
						uni.showToast({//找到了正确的id值，弹窗显示"课程创建成功"
							icon: 'success',
							title: "课程创建成功"
						});
						setTimeout(() => {//等待1.5秒以确保判断完成，然后退出当前界面，返回上个界面
							console.log("settime out")
							uni.navigateBack();
						}, 1500);
					}
				}).catch((error) => {//如果没有找到正确的id值，则执行的操作

				}).finally(() => {//这是无论有没有检测到正确的id值都要执行的语句

				})

			},
			
			formValid(formData) {//判断用户输入formData是否为空(合法)的验证方法
				this.courseCodeError = false;
				this.courseNameError = false;
				this.courseCountError = false;
				this.courseWeekCountError = false;//这四个值控制着输入框的颜色，如果用户输入不合法，则会被激活(true)，然后显示警告的红色
				let errItem = {//声明一个块级作用域的本地变量errItem
					errorText: "",
					error: false
				}
				let result = true;//初始化判断的结果为true，如果下面的判断有一项为false，则判断不通过
				if (formData.courseCode == null || formData.courseCode.length == 0) {
					errItem.error = true;
					errItem.errorText = "请输入课程代码";
					this.courseCodeError = true;
					result = false;
				}
				if (formData.courseName == null || formData.courseName.length == 0) {
					errItem.error = true;
					errItem.errorText = "请输入课程名称";
					this.courseNameError = true;
					result = false;
				}
				if (formData.courseName == null || formData.courseCount.length == 0) {
					errItem.error = true;
					errItem.errorText = "请输入课时数";
					this.courseCountError = true;
					result = false;
				}
				if (formData.courseName == null || formData.courseWeekCount.length == 0) {
					errItem.error = true;
					errItem.errorText = "请输入周课时";
					this.courseWeekCountError = true;
					result = false;
				}
				return result;//将最终结果反馈回去
			}
		},
		
	}
	
</script>
