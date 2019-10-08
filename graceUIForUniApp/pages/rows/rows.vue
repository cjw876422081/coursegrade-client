<template>
	<view>
		<graceHeader title="Flex 布局" desc="以 flex 为基础，更简洁、更高效！"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-flex grace-bg-green" style="height:58px; line-height:58px; color:#FFF; justify-content:center;">
			普通的 flex view
			</view>
			<view class="grace-rows" style="margin-top:15px;">
				<view class="grace-items grace-bg-red grace-rows-demo grace-center">
					1/3 自动缩放
				</view>
				<view class="grace-items grace-bg-green grace-rows-demo grace-center">
					1/3 自动缩放
				</view>
				<view class="grace-items grace-bg-blue grace-rows-demo grace-center">
					1/3 自动缩放
				</view>
			</view>
			<view class="grace-rows" style="margin-top:15px;">
				<view class="grace-items grace-bg-red grace-rows-demo grace-center" style="width:50%;">
					1/2 自动缩放
				</view>
				<view class="grace-items grace-bg-green grace-rows-demo grace-center" style="width:50%;">
					1/2 自动缩放
				</view>
			</view>
			<view class="grace-rows" style="margin-top:15px;">
				<view class="grace-items grace-bg-blue grace-rows-demo grace-center" style="width:30%;">
					30%
				</view>
				<view class="grace-items grace-bg-green grace-rows-demo grace-center" style="width:70%;">
					70%
				</view>
			</view>
			<view class="grace-rows" style="margin-top:15px;">
				<view class="grace-items grace-bg-red grace-rows-demo grace-center" style="width:20%;">
					20%
				</view>
				<view class="grace-items grace-bg-green grace-rows-demo grace-center" style="width:30%;">
					30%
				</view>
				<view class="grace-items grace-bg-blue grace-rows-demo grace-center" style="width:25%;">
					25%
				</view>
				<view class="grace-items grace-bg-red grace-rows-demo grace-center" style="width:25%;">
					25%
				</view>
			</view>
		
			<view class="grace-text-small grace-center" style="margin:20px 0;">竖向排列示例</view>
			<view class="grace-columns">
				<view class="grace-items grace-bg-red grace-rows-demo grace-center" style="width:auto">
					auto
				</view>
				<view class="grace-rows">
					<view class="grace-items grace-bg-green grace-rows-demo grace-center" style="width:50%; margin-right:15px; flex-shrink:0;">
						50% 不缩放
					</view>
					<view class="grace-items grace-bg-green grace-rows-demo grace-center" style="width:100%;">
						右侧 100% 自动缩放
					</view>
				</view>
				<view class="grace-items grace-bg-blue grace-rows-demo grace-center" style="width:80%;">
					80%
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default{}
</script>
<style>
.grace-rows-demo{height:118upx; color:#FFFFFF; width:100%; line-height:118upx;}
</style>