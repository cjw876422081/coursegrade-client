<template>
	<view>
		<!-- 表头固定 -->
		<view class="grace-table grace-fixed" style="height:100upx; overflow:hidden;">
			<view class="grace-table-left">
				<view class="grace-table-title">左侧标题</view>
			</view>
			<scroll-view class="grace-table-right" :scroll-left="scLeft" @scroll="tabelScroll" scroll-x="true">
				<!-- 请修改并规划此处 width -->
				<view class="grace-table-title" style="width:800upx;">
					<view>标签1</view>
					<view>标签2</view>
					<view>标签3</view>
					<view>标签4</view>
				</view>
			</scroll-view>
		</view>
		<!-- 数据表格开始 -->
		<view class="grace-table" style="margin-top:100upx;">
			<!-- 左侧区域 -->
			<view class="grace-table-left">
				<view class="grace-table-title" v-for="(item, index) in leftTitle" :key="index">名称{{item}}</view>
			</view>
			<!-- 右侧侧区域 -->
			<scroll-view class="grace-table-right" :scroll-left="scLeft" scroll-x="true" @scroll="tabelScroll">
				<view class="rows" style="width:800upx;" v-for="(item, index) in rightData" :key="index">
					<view class="items">1.55</view>
					<view class="items colorYellow">95.88%</view>
					<view class="items">16.25%</view>
					<view class="items colorYellow">2018-09-26</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
// 说明 请规划 .rows 的宽度 如内部有4个项目 每个 200 upx 则宽度 = 200 * 4 upx
// 因 uni-app 不支持动态upx 所以只能手动设置

//此数组仅用于演示循环数据
var forData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var tableScrollTimer = null;
var _self;
export default {
	data() {
		return {
			leftTitle : forData,
			rightData : forData,
			scLeft:0
		}
	},
	onLoad: function(){
		_self = this;
	},
	methods:{
		tabelScroll : function(e){
			var scLeft = e.detail.scrollLeft;
			if(tableScrollTimer != null){clearTimeout(tableScrollTimer);}
			tableScrollTimer = setTimeout(function(){
				_self.scLeft = scLeft;
			}, 50);
		}
	}
}
</script>
<style>
page{background:#F5F6F7;}
.grace-fixed{position:fixed; width:750upx; z-index:99; left:0; top:0px; background:#F2F2F2;}
/*  #ifdef H5 */
.grace-fixed{position:fixed; width:750upx; z-index:99; left:-1px; top:43px;}
/*  #endif  */

/* 颜色示例 */
.colorYellow{color:#F4711E !important;}
</style>