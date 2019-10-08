<template>
	<view>
		<graceHeader title="滚动区域组件" desc="页面路径 : /pages/scroll"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text-small grace-center" style="margin:30upx 0;">横向滚动</view>
			<view>
				<scroll-view class="grace-scroll-x" scroll-x>
					<view class="grace-items grace-items-demo1"></view>
					<view class="grace-items grace-items-demo2"></view>
					<view class="grace-items grace-items-demo1"></view>
					<view class="grace-items grace-items-demo2"></view>
					<view class="grace-items grace-items-demo1"></view>
				</scroll-view>
			</view>
			<view class="grace-text-small grace-center" style="margin:30upx 0;">竖向滚动</view>
			<view>
				<scroll-view class="grace-scroll-y" scroll-y>
					<view class="grace-items grace-items-demo1"></view>
					<view class="grace-items grace-items-demo2"></view>
					<view class="grace-items grace-items-demo1"></view>
					<view class="grace-items grace-items-demo2"></view>
					<view class="grace-items grace-items-demo1"></view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
export default {}
</script>
<style>
.grace-items-demo1{background:#00B26A;}
.grace-items-demo2{background:#F76260;}
</style>
