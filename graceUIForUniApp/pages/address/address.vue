<template>
	<view>
		<graceHeader title="地址列表" desc="删除功能在编辑页面底部加一个按钮"></graceHeader>
		<view class="grace-bg-white grace-padding grace-common-mt">
			<view class="grace-title grace-nowrap grace-space-between">
				<view class="grace-h5 grace-blod">我的地址</view>
				<navigator url="../address-add/address-add" class="grace-more-r">+ 添加新地址 </navigator>
			</view>
			<view class="grace-list" style="margin-top:10px;">
				<view class='items' v-for="(item, index) in forData" :key="index">
					<view class="title">
						<view class="grace-address-list-name">姓名<text>181****5688</text></view>
						<view class="grace-address-list-info">具体地址信息</view>
					</view>
					<view class="arrow-right" @tap="editAddress"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				forData : [1,2,3,4,5] //模拟的循环数据
			};
		},
		methods:{
			editAddress : function(){
				uni.showToast({
					title:"请以新增页面为基础改进",
					icon:'none'
				})
			}
		}
	}
</script>
<style>
.grace-list .items .title{height:auto; overflow:hidden; padding:10px 30px 10px 0;}
.grace-list .title text{float:none; margin-left:12px;}
.grace-address-list-name{font-weight:700; line-height:1.8em;}
.grace-address-list-info{line-height:1.8em; color:#999999;}
.grace-list .items .arrow-right{font-family:"grace-iconfont" !important; font-size:36rpx; font-style:normal; height:56px; line-height:56px; text-align:center; width:30px; position:absolute; z-index:1; right:8px; top:0px;}
.grace-list .items .arrow-right:before{content:"\e69e"; color:#B2B2B2;}
</style>