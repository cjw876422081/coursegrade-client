<template>
	<view>
		<graceHeader title="步骤提示" desc="页面地址 : /pages/step"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text-small grace-center" style="margin-top:50upx;">数字形式</view>
			<view class="grace-steps" style="margin-top:25upx;">
				<view class="step">
					<view class="step-circle">1</view>
					<view class="step-content">
						<view class="step-title">步骤1</view>
					</view>
				</view>
				<view class="step current">
					<view class="step-circle">2</view>
					<view class="step-content">
						<view class="step-title">步骤2</view>
					</view>
				</view>
				<view class="step">
					<view class="step-circle">3</view>
					<view class="step-content">
						<view class="step-title">步骤3</view>
					</view>
				</view>
			</view>
			<view class="grace-text-small grace-center" style="margin-top:50upx;">图标形式</view>
			<view class="grace-steps" style="margin-top:20upx;">
				<view class="step">
					<view class="step-circle grace-iconfont icon-pinglun"></view>
					<view class="step-content">
						<view class="step-title">步骤1</view>
					</view>
				</view>
				<view class="step">
					<view class="step-circle grace-iconfont icon-share"></view>
					<view class="step-content">
						<view class="step-title">步骤2</view>
					</view>
				</view>
				<view class="step current">
					<view class="step-circle grace-iconfont icon-safe"></view>
					<view class="step-content">
						<view class="step-title">步骤3</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {}
</script>
<style>
</style>