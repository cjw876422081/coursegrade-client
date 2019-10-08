<template>
	<view class="grace-padding">
		<graceHeader title="九宫格布局" desc="页面路径 pages/boxes"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view style="padding:50upx 0;" class="grace-wrap">
				<view class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">美食</view>
				</view>
				<navigator class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">娱乐</view>
				</navigator>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">外卖</view>
				</view>
				<navigator class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">火车票</view>
				</navigator>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">景点</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">景点</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">美食</view>
				</view>
				<navigator class="grace-boxes">
					<view class="grace-boxes-img">
					<image :src="staticUrl + 'logo.png'" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">娱乐</view>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	data() {
		return {
			staticUrl: this.staticUrl
		}
	}
}
</script>
<style>
/* 此处请根据实际情况 设置图片的宽高以避免抖动 */
.grace-boxes-img image{width:80upx; height:80upx; border-radius:8rpx;}

/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>