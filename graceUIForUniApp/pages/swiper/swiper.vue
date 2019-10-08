<template>
	<view>
		<graceHeader title="轮播组件" desc="自动计算轮播高度"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-common-border" style="padding:15upx;">
			<!-- swiper 的高度 = (外层宽度 720upx ) * (图片的 宽高比例 图片高度/ 图片宽度) -->
			<!-- 本例 图片宽度 : 990px 高度 : 400px -->
			<!-- 计算得出 swiper 的高度 = 720 * 400 / 990 = 290upx-->
			<view class="grace-text-small grace-center" style='margin:50upx 0 10upx 0;'>纯图片模式</view>
			<swiper class="grace-swiper" autoplay="true" indicator-dots indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#00B26A" style="height :290upx" interval="3000">
				<swiper-item v-for="(item, index) in swiperItems" :key="index">
					<navigator :url='item.path' :open-type="item.openType">
						<image :src='item.imgUrl' mode='widthFix'></image>
					</navigator>
				</swiper-item>
			</swiper>
			<view class="grace-text-small grace-center" style='margin:50upx 0 10upx 0;'>图片 + 文字模式</view>
			<swiper class="grace-swiper" autoplay="true" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#00B26A" style="height:290upx" interval="5000">
				<swiper-item v-for="(item, index) in swiperItems" :key="index">
					<navigator :url='item.path' :open-type="item.openType">
						<image :src='item.imgUrl' mode='widthFix'></image>
						<view class="title">{{item.title}}</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
var _self;
export default {
	data() {
		return {
			swiperItems : []
		}
	},
	onLoad:function(){
		_self = this;
		uni.request({
		  url: 'https://www.easy-mock.com/mock/5bb833775df5622d84ac87ca/example/swiperwithtitle#!method=get',
		  success:function(res){
			console.log(res);
			_self.swiperItems = res.data.data;
		  }
		});
	 }
}
</script>
<style>
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>