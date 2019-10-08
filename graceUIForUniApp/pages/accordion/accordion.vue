<template>
	<view>
		<graceHeader title="graceUI 折叠面板" desc="页面路径 pages/accordion "></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-accordion">
				<!-- 项目1 -->
				<view class="grace-accordion-items">
					<view :class="[accordionActive == 'grace-accordion-1' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']" id="grace-accordion-1" @tap	="changeAccordion">
						图片
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-1'"></text>
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
					</view>
					<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-1'" style="font-size:0;">
						<image src="../../static/imgs/banner-gui.png" style="width:100%;" mode="widthFix"></image>
					</view>
				</view>
				<!-- 项目2 -->
				<view class="grace-accordion-items">
					<view :class="[accordionActive == 'grace-accordion-2' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']" id="grace-accordion-2" @tap	="changeAccordion">
						列表
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-2'"></text>
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
					</view>
					<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-2'">
						<view class="grace-list" style='border:none;'>
							<view class='items'>
								<view class='title'>列表1</view>
							</view>
							<view class='items'>
								<view class='title'>列表2</view>
							</view>
							<view class='items'>
								<view class='title'>列表3</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 项目3 -->
				<view class="grace-accordion-items">
					<view :class="[accordionActive == 'grace-accordion-3' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']" id="grace-accordion-3" @tap	="changeAccordion">
						文本
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-up" v-if="accordionActive == 'grace-accordion-3'"></text>
						<text class="grace-list-imgs-arrow grace-iconfont icon-arrow-down" v-else></text>
					</view>
					<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-3'">
						<view style="padding:30upx; line-height:2em;">graceUI - 小程序、uni-app 前端Ui框架 ^_^</view>
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
			accordionActive: "grace-accordion-1"
		}
	},
	methods:{
		changeAccordion : function(e){
			var accordionIndex = e.currentTarget.id;
			if (this.accordionActive == accordionIndex){accordionIndex = '';}
			this.accordionActive = accordionIndex;
		}
	}
}
</script>
<style></style>
