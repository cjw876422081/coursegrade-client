<template>
	<view>
		<graceHeader title="表单验证" desc="多种验证模式，方便、快捷 ^_^"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">姓名</view>
						<input type="text" class="input" name="nickname"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">性别</view>
						<view class="grace-form-r">
							<picker @change="bindPickerChange" :value="gender[genderIndex]" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">出生年月</view>
						<view class="grace-form-r">
							<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" end="2019-01-01">
								<text>{{dateValue}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">个人爱好</view>
						<view class="grace-label-x">
							<checkbox-group name="aihao">
								<label><checkbox value="1"></checkbox>读书</label>
								<label><checkbox value="2"></checkbox>运动</label>
								<label><checkbox value="3"></checkbox>音乐</label>
								<label><checkbox value="4"></checkbox>书法</label>
								<label><checkbox value="5"></checkbox>旅行</label>
								<label><checkbox value="6"></checkbox>其他</label>
							</checkbox-group>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">邮箱</view>
						<input type="text" class="input" name="email"></input>
					</view>
					<view style="padding:22upx 0;">
						<button formType="submit" type="primary" style="width:100%;">提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
var  graceChecker = require("../../graceUI/graceChecker.js");
export default {
	data() {
		return {
			genderIndex: 0,
			gender : ['请选择', '男', '女'],
			dateValue : "请选择"
		}
	},
	methods:{ 
		bindPickerChange:function(e){
			console.log(e);
			this.genderIndex = e.detail.value;
		},
		bindDateChange : function(e){
			this.dateValue = e.detail.value;
		},
		formSubmit : function(e){
			//定义表单规则
			var rule = [
				{name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
				{name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
				{name:"bd", checkType : "notsame", checkRule:"请选择",  errorMsg:"请选择生日"},
				{name:"aihao", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"},
				{name:"email", checkType : "email", checkRule:"",  errorMsg:"请填写您的邮箱"}
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				uni.showToast({title:"验证通过!", icon:"none"});
			}else{
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		}
	}
}
</script>
<style></style>