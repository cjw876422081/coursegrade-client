<template>
	<view>
		<view class="grace-search">
			<view class="grace-search-in">
				<view class="grace-search-icon"></view>
				<input type="search" @input="searchChange" placeholder="城市名称/拼音"></input>
			</view>
		</view>
		<view class="header-line"></view>
		<block v-for="(cities, index) in cityData" :key="index">
			<view class="grace-city-AZ" :id="'grace-city-AZ-'+index">{{index}}</view>
			<view class="grace-list">
				<view class='items' :id="'grace-city-list-'+city.code" v-for="(city, cindex) in cities" :key="cindex">
					<view class="title" :data-cityname="city.name" :data-citycode="city.code" @tap="chooseCity">{{city.name}}</view>
				</view>
			</view>
		</block>
		<view class="grace-city-AZ-right">
			<view v-for="(char, index) in AZ" :key="index" :data-char="char" @tap="changAZ">{{char}}</view>
		</view>
	</view>
</template>
<script>
// 动态头部间距
var topHeight = 60;
//引入城市数据
var dataObj = require('../../data/cityData.js');
var cityData = dataObj.cityData;
var AZ = dataObj.AZ;
var scrollTimer = null;
var searchTimer = null;
var _self;
var searchIndex = -1;
export default {
	data() {
		return {
			cityData : cityData,
			AZ : AZ,
			winScrollTop : 0
		}
	},
	onLoad:function(){
		_self = this;
	},
	methods:{
		// 选择
		chooseCity : function(e){
			var cityname = e.currentTarget.dataset.cityname;
			var citycode = e.currentTarget.dataset.citycode;
			uni.showToast({
				title :cityname + " [ "+ citycode +" ]",
				icon  : "none"
			})
		},
		// 搜索
		searchChange : function(e){
			var k = e.detail.value;
			k = k.toLowerCase();
			if(searchTimer != null){clearTimeout(searchTimer);}
			searchTimer = setTimeout(function(){_self.searchBase(k);}, 500);
		},
		searchBase : function(k){
			searchIndex = -1;
			for(var i in this.cityData){
				for(var ii = 0; ii < this.cityData[i].length; ii++){
					if(this.cityData[i][ii].name.indexOf(k) == 0 || this.cityData[i][ii].pinyin.indexOf(k) == 0){
						searchIndex = this.cityData[i][ii].code;
						break;
					}
				}
				if(searchIndex != -1){break ;}
			}
			if(searchIndex != -1){
				var viewId = '#grace-city-list-'+searchIndex;
				var view = uni.createSelectorQuery().select(viewId);
				view.fields({
					size: true,
					scrollOffset: true,
					rect:true
				}, data => {
					uni.pageScrollTo({
						scrollTop: data.top + this.winScrollTop - topHeight,
						duration: 10
				});
				}).exec();
			}
		},
		// 点击切换
		changAZ : function(e){
			var char = e.currentTarget.dataset.char;
			uni.showToast({title:char, icon:"none"});
			var viewId = '#grace-city-AZ-' + char;
			var view = uni.createSelectorQuery().select(viewId);
			view.fields({
				size: true,
				scrollOffset: true,
				rect:true
			}, data => {
				uni.pageScrollTo({
					scrollTop: data.top + this.winScrollTop - topHeight,
					duration: 10
			});
			}).exec();
		}
	},
	// 获取滚动条当前位置
	onPageScroll:function(e){
		if(scrollTimer != null){clearTimeout(scrollTimer);}
		scrollTimer = setTimeout(function(){
			_self.winScrollTop = e.scrollTop;
		}, 200);
	}
}
</script>
<style>
.header-line{height:55px;}
.grace-search{position:fixed; left:0; top:0; background:#F1F2F3; padding:15upx 0; z-index:99;}
.grace-search-in{width:500upx; margin:0 auto; background:#FFF;}
.grace-city-search{background:#FFF; padding:30upx 0;}
.grace-city-AZ{background:#FFF; text-indent:20upx; line-height:88upx;}
.grace-city-AZ-right{background:#FFFFFF; width:50upx; position:fixed; right:0; top:60px;}
.grace-city-AZ-right view{line-height:42upx; font-size:28upx; text-align:center;}
/*  #ifdef  H5  */
.grace-search{position:fixed; left:0; top:44px;}
.grace-city-AZ-right{background:#FFFFFF; width:50upx; position:fixed; right:0; top:110px;}
/*  #endif  */
</style>