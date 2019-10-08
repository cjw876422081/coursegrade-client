<template>
	<view>
		<graceHeader title="徽章组件" desc="页面路径 pages/badge"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view style="padding:50upx;" class="badge-demo grace-center">
				<text class="grace-badge">1</text>
				<text class="grace-badge grace-badge-red">20</text>
				<text class="grace-badge grace-badge-green">30</text>
				<text class="grace-badge grace-badge-blue">HOT</text>
				<text class="grace-badge grace-badge-yellow">500</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	
}
</script>
<style>
.badge-demo{justify-content:center; }
.badge-demo text{margin:6upx;}
</style>
