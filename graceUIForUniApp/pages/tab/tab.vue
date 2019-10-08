<template>
	<view>
		<graceHeader title="局部选项卡" desc="需要设置选项区域高度"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<!-- 选项卡 -->
			<view class="grace-tab" style="margin-top:30px;">
				<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
					<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']"  :id="'tabTag-'+index" @tap="tabChange" :key="index">{{tab.name}}</view>
				</scroll-view>
				<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" style="height:350upx;">
					<swiper-item>关注</swiper-item>
					<swiper-item>推荐</swiper-item>
					<swiper-item>体育</swiper-item>
					<swiper-item>热点</swiper-item>
					<swiper-item>国内</swiper-item>
					<swiper-item>国外</swiper-item>
					<swiper-item>其他</swiper-item>
				</swiper>
			</view>
			<!-- 选项卡 -->
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			tabs: [
				{ name: '关注', id: 'guanzhu' },
				{ name: '推荐', id: 'tuijian' },
				{ name: '体育', id: 'tiyu' },
				{ name: '热点', id: 'redian' },
				{ name: '国内', id: 'guonei' },
				{ name: '国外', id: 'guowai' },
				{ name: '其他', id: 'qita' }
			],
			titleShowId : 'tabTag-0'
		}
	},
	methods:{
		tabChange: function (e) {
			var index = e.target.id.replace('tabTag-', '');
			this.swiperCurrentIndex = index;
			this.tabCurrentIndex    = index;
			this.titleShowId        = 'tabTag-'+index;
		},
		swiperChange: function (e) {
			var index = e.detail.current;
			this.tabCurrentIndex = index;
			this.titleShowId        = 'tabTag-'+index;
		}
	}
}
</script>
<style>
swiper-item{background:#F3F4F5; line-height:350upx; text-align:center; font-size:36px; color:#888;}
</style>