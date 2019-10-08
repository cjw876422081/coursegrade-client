<template>
	<view>
		<view>
			<graceHeader title="弹出式菜单" desc="页面路径 pages/popupmenu"></graceHeader>
		</view>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view style="min-height:30px; width:92%; margin:0 auto; position:relative;">
				<view style="width:60%; float:left; line-height:28px;">
					请点击加号按钮测试
				</view>
				<view class="demo-btn-1" id="demo-btn-1">
					<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/popupmenu.png" mode="widthFix" @tap="showMenu1"></image>
				</view>
				<!-- gracePopupMenu 组件外层定位必须为 position:relative;  -->
				<gracePopupMenu :show="menu1Show" :top="menu1Top" v-on:hideMenu="hideMenu">
					<view class="grace-list" style="background:#4C4C4C; border:0;">
						<view class='items'>
							<view class="icons">
								<image src="http://staticimgs.oss-cn-beijing.aliyuncs.com/scan.png" mode="widthFix"></image>
							</view>
							<view class="title" @tap="tap1">功能菜单1</view>
						</view>
						<view class='items'>
							<view class="icons">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/set.png" mode="widthFix"></image>
							</view>
							<view class="title"  @tap="tap2">功能菜单2</view>
						</view>
						<view class='items'>
							<view class="icons">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/product.png" mode="widthFix"></image>
							</view>
							<view class="title" @tap="tap3">功能菜单3</view>
						</view>
					</view>
				</gracePopupMenu>
			</view>
		</view>
	</view>
</template>
<script>
import gracePopupMenu from '../../graceUI/components/gracePopupMenu.vue';
export default {
	data() {
		return {
			menu1Show : false,
			menu1Top  : 30
		};
	},
	methods: {
		showMenu1 : function(e){
			if(this.menu1Show){
				this.menu1Show = false;
				return ;
			}
			// 动态调整菜单的 top 值
			// 原理 : 获取按钮的高度 = 菜单的 top 值
			let view = uni.createSelectorQuery().select("#demo-btn-1");
			view.fields({size: true}, data => {
			  this.menu1Show = true;
			  this.menu1Top = data.height;
			}).exec();
		},
		// 关闭菜单方法
		hideMenu : function(){
			this.menu1Show = false;
		},
		// 菜单点击函数
		tap1 : function(){
			uni.showToast({
				title:"您点击了第1个菜单",
				icon: "none"
			});
			this.hideMenu();
		},
		tap2 : function(){
			uni.showToast({
				title:"您点击了第2个菜单",
				icon: "none"
			});
			this.hideMenu();
		},
		tap3 : function(){
			uni.showToast({
				title:"您点击了第3个菜单",
				icon: "none"
			});
			this.hideMenu();
		}
	},
	components:{
		gracePopupMenu
	}
}
</script>
<style>
/* 页面个性化样式 */
.demo-btn-1{width:28px; height:28px; float:right; border-radius:3px; border:1px solid #00C777; text-align:center; font-size:0;}
.demo-btn-1 image{width:18px; height:18px; margin:5px;}
.grace-list view{color:#FFF;}
.grace-list .title{border:0;}
</style>