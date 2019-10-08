<template>
	<view>
		<view class="grace-waterfall">
			<view class="list" v-for="(lists, index1) in productList" :key="index1">
				<navigator class="items" v-for="(products, index2) in lists" :key="index2">
					<image :src="products.img" class="imgs" mode="widthFix"></image>
					<view class="title">{{products.title}}</view>
					<view class="price">
						{{products.price}}
						<view class="tips">{{products.tip}}</view>
					</view>
				</navigator>
			</view>
		</view>
		<graceLoading :loadingType="loadingType"></graceLoading>
	</view>
</template>
<script>
// pages/demo/waterfall.js
var page = 1, _self;
//引入产品数据
var dataObj = require('../../data/data.js');
var products = dataObj.products;
//引入 loadin 组件
import graceLoading from "../../graceUI/components/graceLoading.vue";
export default {
	data() {
		return {
			loading: false,
			loadingType: 0,
			isEnd: false,
			productList : [[],[]]
		}
	},
	onLoad: function (options) {
		_self = this;
		this.getList();
	},
	//上拉加载更多
	onReachBottom:function(){
		this.getList();
	},
	onBackPress:function(){
		this.loadingType = 0;
		this.isEnd = false;
		page = 1;
	},
	methods: {
		getList : function(){
			//最后一页判断
			if(page > 3){
				this.isEnd = true;
				this.loadingType = 2;
				return;
			}
			this.loadingType = 1;
			//模拟api请求延迟关闭 Loading
			setTimeout(function () {
				var lArr = _self.productList[0];
				var rArr = _self.productList[1];
				//填充数组[此处的 products 数据应该来自与api接口数据]
				//数据格式见 "/data/data.js"
				products = dataObj.getArrRandomly(products); //打乱排序【模拟api】
				for (var i = 0; i < products.length; i++) {
					if (i % 2 == 0) {
						lArr.push(products[i]);
					} else {
						rArr.push(products[i]);
					}
				}
				_self.productList = [lArr, rArr];
				_self.loadingType = 0;
				page++;
			}, 1000);
		}
	},
	components : {
		graceLoading
	}
}
</script>
<style>
page{background:#FFF;}
</style>