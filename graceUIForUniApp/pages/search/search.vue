<template>
	<view>
		<!-- 搜索条 -->
		<view style="width:96%; padding:20upx 2%; background:#00C777; flex-wrap:nowrap;">
			<view class="grace-search">
				<view class="grace-search-btns">
					<image :src="staticUrl + 'scan.png'" mode='widthFix'></image>
				</view>
				<view class="grace-search-in">
					<view class="grace-search-icon"></view>
					<input type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="关键字"></input>
					<view class="grace-search-icon grace-search-clear" @tap="clearKey" v-if="searchClose"></view>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view style="width:94%; padding:15upx 3%;">
			<view class="grace-title grace-nowrap grace-space-between">
				<view class="grace-h5">搜索历史</view>
				<view class="grace-more-r grace-search-remove"></view>
			</view>
			<view class="grace-tips">
				<view>关键字</view>
				<view>关键字</view>
				<view>关键字</view>
			</view>
		</view>
		<!-- 热门 -->
		<view style="width:94%; padding:15upx 3%;">
			<view class="grace-h5">热门搜索</view>
			<view class="grace-tips">
				<view>关键字</view>
				<view>关键字</view>
				<view>关键字</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			searchKey : "",
			searchClose : false
		}
	},
	methods:{
		searchChange:function(e){
			var key = e.detail.value;
			this.searchKey = key;
			if(key.length >= 1){
				this.searchClose = true;
			}else{
				this.searchClose = false;
			}
		},
		clearKey:function(){
			this.searchClose = false;
			this.searchKey   = "";
		},
		searchNow:function(){
			uni.showToast({
				title : '开始搜索 ' + this.searchKey,
				icon  : "none"
			});
		}
	}
}
</script>
<style>
page{background:#FFF;}
</style>