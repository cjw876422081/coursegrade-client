/**
* 创建课程
* 表单获取用户输入的：课程编号、课程名、课时数、周课时数、课程描述，自动填充创建时间、创建人。
*/

<template>
	<view class="window">
		<view class="pictureUpload">
			这里是课程封面上传区域(我太难了T_T)
		</view>
		<view class="courseInformation">
			<view class="courseInformationImput">
				<label class="lable">课程号：</label>
				<input class="input" placeholder="未设置" type="number" confirm-type="next" />
			</view>
			<view class="courseInformationImput">
				<label class="lable">课程名：</label>
				<input class="input" placeholder="未设置" type="text" confirm-type="next" />
			</view>
			<view class="courseInformationImput">
				<label class="lable">课时数：</label>
				<input class="input" placeholder="未设置" type="number" confirm-type="next" />
			</view>
			<view class="courseInformationImput">
				<label class="lable">周课时：</label>
				<input class="input" placeholder="未设置" type="number" confirm-type="done" />
			</view>
			<view class="courseInformationLable">
				<label class="lable" style="font-weight: 700;">课程描述：</label>
			</view>
			<view class="courseInformationText">
				<textarea class="textarea"></textarea>
			</view>
		</view>
		<view class="submit">
			<button type="primary">提交课程信息</button>
		</view>
	</view>
</template>


<style>
	.window {
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


	}

	.submit {
		margin-left: 5vw;
	
		width: 90vw;
		height: 5vh;
		border-radius: 10px;
		color: rgba(0, 0, 0, 1);
	}
</style>

<script>
	function l(evn) {
		var id = $(evn).attr('id'); //获取id
		var num = id + "_1";
		var file = event.target.files[0];
		if (window.FileReader) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			//监听文件读取结束后事件
			reader.onloadend = function(e) {

				$("#" + num).css("display", "block");
				$("#" + num).attr("src", e.target.result); //e.target.result就是最后的路径地址
			};
		}
	}

	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
