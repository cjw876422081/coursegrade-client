<template>
	<view>
		<graceHeader title="上拉加载" desc="向上拉动试试吧 ^_^"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="refreshDmo">
				<view v-for="(item, index) in demoDate" :key="index">{{item}}</view>
			</view>
		</view>
		<graceLoading :loadingType="loadingType"></graceLoading>
	</view>
</template>
<script>
import graceLoading from '../../graceUI/components/graceLoading.vue';
var page = 1; //模拟一个页码
var _self;
var demoDate = ["H", "C", 'O', 'D', 'E', 'R', 'D', 'E', 'M', 'O'];
export default {
	data() {
		return {
			demoDate: demoDate,
			loadingType : 0,
			isEnd : false
		}
	},
	onLoad: function (options) {
		_self = this;
	},
	onBackPress:function(){
		page = 1;
		this.loading = false;
		this.loadingType = 0;
		this.isEnd = false;
	},
	onReachBottom : function(){
		//避免多次触发
		if (this.loadingType == 1 || this.isEnd){return ;}
		this.loadMoreFunc();
	},
	methods:{
		//加载更多时执行的函数
		loadMoreFunc: function (){
			//如果page > 2 代表加载了全部数据
			if (page > 2){
				this.isEnd = true;
				this.loadingType = 2;
				return ;
			}
			//展示loading
			this.loadingType = 1;
			//追加数据(延迟1秒 模拟网络请求)
			setTimeout(function(){
				_self.loading  = false;
				var newData    = _self.getArrRandomly(demoDate);
				_self.demoDate = _self.demoDate.concat(newData);
				//累加页码
				page++;
				_self.loadingType = 0;
			}, 1000);
		},
		getArrRandomly: function (arr) {
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				var randomIndex = Math.floor(Math.random() * (len - i));
				var itemAtIndex = arr[randomIndex];
				arr[randomIndex] = arr[i];
				arr[i] = itemAtIndex;
			}
			return arr;
		}
	},
	components: {
		graceLoading
	}
}
</script>
<style>
.refreshDmo{padding:25upx 2%; width:96%; display:flex; flex-wrap:wrap;}
.refreshDmo view{background:#00B26A; color:#FFFFFF; height:100px; line-height:100px; text-align:center; width:46%; margin:15upx 2%; font-size:30upx;}
</style>