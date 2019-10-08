<template>
	<view>
		<graceHeader title="通用列表" desc="页面路径 pages/list"></graceHeader>
		<view class="grace-bg-white grace-common-mt">
			<view class="grace-list">
				<view class='items'>
					<view class="icons">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</view>
					<view class="title">图标<text>描述</text></view>
					<view class="arrow-right"></view>
				</view>
				<navigator class='items'>
					<view class="title">没有图标</view>
					<view class="arrow-right"></view>
				</navigator>
				<view class='items'>
					<view class="title">右侧图标</view>
					<view class="icons icon-r">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</view>
					<view class="arrow-right"></view>
				</view>
				<view class='items'>
					<view class="icons">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</view>
					<view class="title">没有箭头<text>描述</text></view>
				</view>
				<view class='items'>
					<view class="title">姓名<text style='margin-right:35px;'>graceUI</text></view>
					<view class="icons icon-r">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</view>
					<view class="arrow-right"></view>
				</view>
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
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>