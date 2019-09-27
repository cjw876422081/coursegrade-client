/**
 * 创建课程
 * 表单获取用户输入的：课程代码、课程名、课时数、课程周数、课程描述，自动填充创建时间、创建人。
 */

<template>
	<view>
	    <view class="uni-padding-wrap uni-common-mt">
	        <view class="uni-flex uni-column">
				<view class="navigation">
					这里是导航栏
				</view>
				<view class="imageUpload">
					这里是课程图片上传组件区域
				</view>
				<view class="courseForm">
					这里是课程信息表单区域
				</view>
	            <view class="submitButton">
	            	这里是提交按钮区域
	            </view>
	        </view>
	    </view>
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
	.navigation{
		left: 0px;
		top: 44px;
		width: 411px;
		height: 50px;
		line-height: 20px;
		background-color: rgba(0, 47, 147, 0.75);
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
	}
	.imageUpload{
		left: 0px;
		top: 130px;
		width: 410px;
		height: 156px;
		line-height: 20px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
	}
	.courseForm{
		left: 0px;
		top: 286px;
		width: 410px;
		height: 441px;
		line-height: 20px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
	}
	.submitButton{
		left: 0px;
		top: 731px;
		width: 411px;
		height: 91px;
		line-height: 20px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
	}
</style>
