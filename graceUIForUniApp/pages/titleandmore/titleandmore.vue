<template>
	<view>
		<graceHeader title="标题、更多、换一批" desc="页面 : /pages/titleandmore"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<!-- 示例 1 -->
			<view class="grace-title" style="margin-top:30upx;">
				<view class="grace-h5 grace-blod grace-center">- 示例标题1 -</view>
				<view class="grace-text-small grace-center">标题居中，带有描述</view>
			</view>
			<view class="grace-imgitems">
				<view class="grace-items">
				  <image src="../../static/imgs/banner.png" mode="widthFix"></image>
				  <view class="grace-imgitems-tips">
						<text>hot</text>
						<view class="grace-imgitems-tips-border"></view>
					</view>
				</view>
				<view class="grace-items">
					<image src="../../static/imgs/banner.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="grace-more-bottom">
				<navigator>更多好产品推荐 <text class="grace-iconfont icon-arrow-right"></text></navigator>
			</view>
			<!-- 示例1 -->
			<!-- 示例2 -->
			<view class="grace-title grace-nowrap grace-space-between" style="margin-top:60upx;">
				<view class="grace-h5 grace-blod">标题示例2</view>
				<navigator class="grace-more-r">更多<text class="grace-iconfont icon-arrow-right"></text></navigator>
			</view>
			<view class="grace-imgitems">
				<view class="grace-items">
				  <image src="../../static/imgs/banner.png" mode="widthFix"></image>
				  <view class="grace-imgitems-tips">
						<text>hot</text>
						<view class="grace-imgitems-tips-border"></view>
					</view>
				</view>
				<view class="grace-items">
					<image src="../../static/imgs/banner.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="grace-more-bottom">
				<navigator>更多好产品推荐 <text class="grace-iconfont icon-arrow-right"></text></navigator>
			</view>
			<!-- 示例2 -->
			<!-- 示例3 -->
			<view class="grace-title grace-nowrap grace-space-between" style="margin-top:60upx;">
				<view class="grace-h5 grace-blod">换一批示例</view>
				<navigator class="grace-more-r" style="color:#49A761;"><text class="grace-iconfont icon-refresh"></text> 换一批</navigator>
			</view>
			<view class="grace-imgitems">
				<view class="grace-items">
					<image src="../../static/imgs/banner.png" mode="widthFix"></image>
					<view class="grace-imgitems-tips">
						<text>hot</text>
						<view class="grace-imgitems-tips-border"></view>
					</view>
				</view>
				<view class="grace-items">
				  <image src="../../static/imgs/banner.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 示例3 -->
			<view style="height:100upx;"></view>
		</view>
	</view>
</template>
<script>
export default {}
</script>
<style>
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>