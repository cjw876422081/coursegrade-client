<template>
	<view>
		<graceHeader title="自定义导航栏" desc="仅在 app 及 h5 端生效"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text" style="margin-top:30px;">
				<text class="grace-blod">步骤</text>
				<text>\n1. 在 page.json 中通过配置的方式来修改自定义导航及按钮;</text>
				<text>\n2. 在 js 中完善点击事件;</text>
				<text class="grace-blod">\n手册地址</text>
				<text>\nhttps://uniapp.dcloud.io/collocation/pages?id=app-plus</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			};
		},
		onNavigationBarButtonTap(e) {
			//根据 e.index 判断具体某个按钮被点击
			if(e.index === 0){
				uni.showToast({
					title: "您点击了分享按钮" ,
					icon: "none"
				});
			}else if(e.index === 1){
				uni.showToast({
					title: "您点击了提交按钮" ,
					icon: "none"
				});
			}
			
		},
	}
</script>
<style>

</style>
