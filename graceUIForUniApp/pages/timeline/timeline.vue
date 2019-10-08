<template>
	<view>
		<graceHeader title="时间轴" desc="页面 : /pages/timeline"></graceHeader>
			<view class="grace-timeline" style="margin-top:30rpx; background:#FFF;">
				<view class="rows">
					<view class="grace-timeline-time">
						<view>09/26/2018</view>
						<view>18:30</view>
					</view>
					<view class="grace-timeline-tips">
						<view class="grace-timeline-circular">
							<text class="grace-iconfont icon-time"></text>
						</view>
					</view>
					<view class="grace-timeline-content">
						<view class="grace-h5 grace-blod">graceUI</view>
					<view class="grace-text">graceUI 发布于 2018-09-20</view>
					</view>
					<view class="grace-timeline-line"></view>	
				</view>
				<view class="rows">
					<view class="grace-timeline-time">
						<view>07/08/2018</view>
						<view>20:15</view>
					</view>
					<view class="grace-timeline-tips">
						<view class="grace-timeline-circular">1</view>
					</view>
					<view class="grace-timeline-content">
						<view class="grace-h5 grace-blod">graceUI</view>
					<view class="grace-text">graceUI 发布于 2018-09-20</view>
					</view>
					<view class="grace-timeline-line"></view>	
				</view>
				<view class="rows">
					<view class="grace-timeline-time">
						<view>06/21/2018</view>
						<view>15:18</view>
					</view>
					<view class="grace-timeline-tips">
						<view class="grace-timeline-circular">字</view>
					</view>
					<view class="grace-timeline-content">
						<view class="grace-h5 grace-blod">graceUI</view>
					<view class="grace-text">graceUI 发布于 2018-09-20</view>
					</view>
					<view class="grace-timeline-line"></view>	
				</view>
				<view class="rows">
					<view class="grace-timeline-time">
						<view>05/19/2018</view>
						<view>09:28</view>
					</view>
					<view class="grace-timeline-tips">
						<view class="grace-timeline-circular">
							<image src="../../static/imgs/logo.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="grace-timeline-content">
						<view class="grace-h5 grace-blod">graceUI</view>
					<view class="grace-text">graceUI 发布于 2018-09-20</view>
					</view>
				</view>
			</view>
	</view>
</template>
<script>
export default {
	
}
</script>
<style>
/* 页面个性化样式 */
.grace-h5{line-height:1.6em;}
.grace-text{line-height:1.5em; font-size:22upx;}
</style>
