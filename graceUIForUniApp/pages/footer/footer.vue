<template>
	<view>
		<graceHeader title="底部导航" desc="页面路径 pages/footer"></graceHeader>
		<!-- 评论输入框形式 -->
		<view class="grace-footer">
			<view class="icons grace-iconfont icon-share"></view>
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input type="text" disabled placeholder="请新窗口实现,避免键盘遮盖问题"></input>
			</view>
			<view class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
		<!-- 按钮形式 -->
		<view class="grace-footer" style="bottom:92upx;">
			<view style="width:60%;" class="grace-nowrap">
				<view class="icons grace-iconfont icon-home" @tap="home"></view>
				<view class="icons grace-iconfont icon-share"></view>
				<view class="icons grace-iconfont icon-like"></view>
			</view>
			<view style="width:40%;">
				<button type="warn">立即购买</button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	methods:{
		home : () => {
			uni.switchTab({
				url:"../index/index"
			})
		}
	}
}
</script>
<style></style>
