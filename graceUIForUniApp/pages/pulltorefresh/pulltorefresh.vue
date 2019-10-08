<template>
	<view>
		<graceHeader title="下拉刷新" desc="下拉一下试试吧"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="refreshDmo">
				<view v-for="(item, index) in refreshDate">{{item}}</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			refreshDate: [
				"H", "C", 'O', 'D', 'E', 'R', 'D', 'E', 'M', 'O', 'H', 'I', "^_^","(:"
			]
		}
	},
  onLoad: function (options) {

  },
	//下拉刷新事件
	onPullDownRefresh: function (){
		this.refreshFunc();
	},
	methods:{
		//下拉刷新时执行的函数
		refreshFunc : function(){
			//将数据进行随机排序模拟刷新
			var newData = this.getArrRandomly(this.refreshDate);
			console.log(newData);
			this.refreshDate = null;
			this.refreshDate = newData;
			uni.showToast({title: "下拉刷新结束", icon:"none"});
			uni.stopPullDownRefresh();
		},
		getArrRandomly : function (arr) {
			var len = arr.length;
			for(var i = 0; i<len; i++) {
				var randomIndex = Math.floor(Math.random() * (len - i));
				var itemAtIndex = arr[randomIndex];
				arr[randomIndex] = arr[i];
				arr[i] = itemAtIndex;
			}
			
			return arr;
		}
	}
}
</script>
<style>
.refreshDmo{padding:25upx 2%; width:96%; display:flex; flex-wrap:wrap;}
.refreshDmo view{background:#00B26A; color:#FFFFFF; height:100px; line-height:100px; text-align:center; width:46%; margin:15upx 2%; font-size:30upx;}
</style>