<template>
	<view class="grace-padding">
		<view class="grace-h4 grace-blod">关于GraceUI</view>
		<view class="grace-text-small">Date : 2018-09-20</view>
		<view class="grace-text" style="margin-top:12upx;">
			<image :src="staticUrl + 'text-banner.png'" mode="widthFix"></image>
			<view class="grace-text">
				<text>缩进GraceUI 是一款兼容微信小程序、uni-app的优秀前端框架，具有轻快、多端兼容等特点！</text>
				<text>\nGraceUI 提供了丰富的基础组件及界面库，可以极大程度的提高开发速度！</text>
			</view>
			<view class="grace-blod">
				文字加粗
			</view>
			<view class="grace-center grace-italic">
				文字居中 + 倾斜
			</view>
			<view class="grace-line-through">
				文字贯穿线
			</view>
			<view class="grace-text-small">
				小字体
			</view>
			<view>
				<text class="grace-h1">GraceUI</text>
				<text class="grace-h2">\nGraceUI</text>
				<text class="grace-h3">\nGraceUI</text>
				<text class="grace-h4">\nGraceUI</text>
				<text class="grace-h5">\nGraceUI</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			staticUrl: this.staticUrl
		}
	},
}
</script>
<style>
page{background:#FFF;}
</style>
