<template>
<view>
	<graceHeader title="图文列表" desc="页面路径 pages/demo/imgitem"></graceHeader>
	<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
		<view class="grace-text-small grace-center" style="margin-bottom:20upx;">普通模式</view>
		<view class="grace-imgitems">
			<view class="grace-items">
				<image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-tips">标签</view>
			</view>
			<view class="grace-items">
				<image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-tips grace-imgitems-tips-green grace-imgitems-tips-r">右侧标签</view>
			</view>
		</view>
		<view class="grace-text-small grace-center" style="margin:20upx 0; margin-top:40upx;">带有标题信息</view>
		<view class="grace-imgitems">
			<view class="grace-items">
				<image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-text">标题信息</view>
			</view>
			<view class="grace-items">
				<image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-text">
					<text class="grace-text-overflow">标题信息</text>
				</view>
			</view>
		</view>
		<view class="grace-text-small grace-center" style="margin:20upx 0; margin-top:40upx;">组合模式</view>
		<view class="grace-imgitems">
			<view class="grace-items">
			  <image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-text">
					标题信息
				</view>
				<view class="grace-imgitems-more">
					****
					<view class="grace-imgitems-button">按钮</view>
				</view>
			</view>
			<view class="grace-items">
			  <image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-text">
					<text class="grace-text-overflow">标题信息</text>
				</view>
			</view>
			<view class="grace-items">
				<image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-text">
					某某商品
				</view>
				<view class="grace-imgitems-more">
					￥199.99
					<view class="grace-imgitems-button">按钮</view>
				</view>
				<view class="grace-imgitems-tips">标签</view>
			</view>
			<view class="grace-items">
			  <image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
				<view class="grace-imgitems-text">
					<text class="grace-text-overflow">标题信息</text>
				</view>
			</view>
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
<style></style>
