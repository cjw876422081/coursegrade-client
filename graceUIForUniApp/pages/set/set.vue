<template>
	<view>
		<graceHeader title="用户昵称" desc="其他信息..."></graceHeader>
		<view class="grace-list grace-bg-white grace-common-mt">
			<view class='items'>
				<view class="title">姓名<text style='margin-right:35px;'>graceUI</text></view>
				<view class="icons icon-r">
				  <image src="/imgs/logo.png" mode="widthFix"></image>
				</view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">班级<text>hcoder</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">年龄<text>18岁</text></view>
				<view class="arrow-right"></view>
			</view>
		</view>

		<view class="grace-list grace-bg-white grace-common-mt">
			<view class='items'>
				<view class="title">认证<text>已认证</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">
				  通知
				  <switch checked style='float:right'></switch>
				</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<view style="width:100%; margin-top:18px;">
			<button style="width:100%; background:#FFFFFF; border:0;">退出登录</button>
		</view>
		<view style="width:100%; height:30px;"></view>
	</view>
</template>
<script>
export default {}
</script>
<style>
</style>