<template>
	<view>
		<graceHeader title="多功能菜单" desc="页面路径 pages/popovermenu"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view style="width:80%; margin:20px auto; line-height:1.8em; text-align:center;">
				注意 : 模拟器的效果偏大，手机上运行才是真实效果哦 (:
			</view>
		</view>
		<!--  纵向多功能按钮 -->
		<view class="grace-popover-menu">
			<!-- 图标形式 请自行添加点击事件 @tap -->
			<view class="item grace-iconfont icon-weibo grace-bg-red" :hidden="popmenuShow"></view>
			<!-- 图片形式 请自行添加点击事件 @tap -->
			<view class="item" :hidden="popmenuShow"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/menu-wx.png" mode="widthFix"></image></view>
			<!-- 文字形式 请自行添加点击事件 @tap -->
			<view class="item grace-iconfont grace-bg-blue" style="font-size:14px;" :hidden="popmenuShow">QQ</view>
			<!-- 主按钮 -->
			<view class="item grace-iconfont icon-share" @tap="showmenu" style="background:#2FBF79;"></view>
		</view>
		
		<!-- 横向多功能按钮 -->
		<view class="grace-popover-menu-x">
			<!-- 图标形式 请自行添加点击事件 @tap -->
			<view class="item grace-iconfont icon-weibo grace-bg-red" :hidden="popmenuShowX"></view>
			<!-- 图片形式 请自行添加点击事件 @tap -->
			<view class="item" :hidden="popmenuShowX"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/menu-wx.png" mode="widthFix"></image></view>
			<!-- 主按钮 放在中间 动态添加一个360度翻转动画 -->
			<view :class="['itemCenter', popmenuShowX == false ? 'grace-animate-rotateY360' : '']" @tap="showmenuX" style="background:#2FBF79; font-size:16px;">分享</view>
			<!-- 文字形式 请自行添加点击事件 @tap -->
			<view class="item grace-iconfont grace-bg-blue" style="font-size:14px;" :hidden="popmenuShowX">QQ</view>
			<!-- 图标形式 请自行添加点击事件 @tap -->
			<view class="item grace-iconfont icon-star grace-bg-red" :hidden="popmenuShowX"></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			popmenuShow : true,
			popmenuShowX : true
		};
	},
	methods: {
		showmenu : function () {
			this.popmenuShow = !this.popmenuShow;
		},
		showmenuX : function () {
			this.popmenuShowX = !this.popmenuShowX;
		}
	},
}
</script>
<style>

</style>