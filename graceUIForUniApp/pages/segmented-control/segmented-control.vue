<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']" @tap="tabChange">{{cate.name}}</view>
		</scroll-view>
		<view class="demo-content">
			{{content}}
		</view>
		<view class="grace-center grace-text" style="margin-top:20px;">
			分段切换和选项卡相比 : 页面承载数据更小，效率更高 !
			<text>\n缺点 : 不能滑动切换，只能点击切换分类</text>
			<text>\n 请根据项目需求选择使用</text>
		</view>
		<view class="grace-more-bottom" style="margin-top:20px;">
			<navigator url="../segmented-control-demo/segmented-control-demo">
				<text>点击这里查看一个使用分段器实现的新闻列表实例\n功能涵盖 : 下拉刷新、加载更多、分类切换</text>
			</navigator>
		</view>
		<view class="grace-more-bottom" style="margin-top:20px; width:80%; margin:0 auto;">
			<button type="primary" @tap="gotodemo">新闻列表实例 <text class="grace-iconfont icon-arrow-right"></text></button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			//分类信息
			categories : [
				{cateid : 0, name : "全部"},
				{cateid : 1, name : "风景"},
				{cateid : 2, name : "游记"},
				{cateid : 3, name : "世界"}
			],
			// 当前选择的分类
			cateCurrentIndex : 0,
			// 内容实例，内容区域您根据项目情况设计即可，覆盖模式
			content : "全部"
		};
	},
	methods:{
		gotodemo : function(){
			uni.navigateTo({
				url:'../segmented-control-demo/segmented-control-demo'
			})
		},
		tabChange : function(e){
			// 选中的索引
			var index  = e.currentTarget.dataset.index;
			// 具体的分类id
			var cateid = e.currentTarget.dataset.cateid;
			this.cateCurrentIndex = index;
			// 动态替换内容
			this.content = this.categories[index].name;
		}
	}
}
</script>
<style>
page{background:#FFF;}
.demo-content{width:100%; height:200px; background:#F7F8F9; text-align:center; line-height:200px; font-size:22px;}
</style>