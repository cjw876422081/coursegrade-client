<template>
	<view>
		<graceHeaderLineForApp></graceHeaderLineForApp>
		<graceHeader title="graceUI" desc="基于uni-app及微信小程序的优秀前端框架"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-h5 grace-blod grace-center" style="margin-top:50upx;">轻快的实力派</view>
			<view class="grace-text" style="margin:20px;">
				<view>
					GraceUI 是一款兼容微信小程序、uni-app的优秀前端框架，具有轻快、多端兼容等特点！
				</view>
				<view>
					GraceUI 提供了丰富的基础组件及界面库，可以极大程度的提高开发速度！
				</view>
				<view>
				  购买 GraceUI 后终身授权！无任何隐藏版本信息、不限项目个数！终身免费升级！	
				</view>
				<view>
				  GraceUI 唯一的版权约束就是不能转售或者将 GraceUI 直接发布到公开渠道（如 : github）！
				</view>
				<view @tap="goBrowser">
					官网及手册地址 : <text style="color:#00B26A; margin-left:12upx;">http://grace.hcoder.net</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import graceHeaderLineForApp from "../../graceUI/components/graceHeaderLineForApp.vue";
export default {
	methods: {
		goBrowser() {
			// #ifdef APP-PLUS
			plus.runtime.openURL("http://grace.hcoder.net");
			// #endif
			// #ifdef MP-WEIXIN
			uni.showModal({
				content:"请在浏览器里打开",
				showCancel:false
			})
			// #endif
		}
	},
	components:{
		graceHeaderLineForApp
	}
}
</script>
<style>

</style>