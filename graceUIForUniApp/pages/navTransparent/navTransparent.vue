<template>
	<view>
		<graceHeader title="渐变导航" desc="仅在 app 及 h5 端生效"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<!-- 演示内容  -->
			<view class="grace-padding">
				<view class="grace-imgitems">
					<view class="grace-items" v-for="(item, index) in forData" :key="index">
						<image :src="staticUrl + 'banner-gui.png'" mode="widthFix"></image>
						<view class="grace-imgitems-tips">标签</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			staticUrl : this.staticUrl,
			forData : [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
		}
	},
}
</script>
<style>
</style>