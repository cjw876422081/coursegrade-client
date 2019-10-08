<template>
	<view>
		<graceHeader title="滑块组件" desc="支持区间滑块"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text grace-text-small grace-center" style="margin-top:30upx;">示例 1</view>
			<view style="padding:5px 5%; width:90%;">
				<view class="grace-text" style='text-indent:15upx;'>年龄 : {{ageMin}} - {{ageMax}}岁</view>
				<graceSlider :min="1" :max="100" :val1="ageMin" :val2="ageMax" v-on:sliding="sliding1"></graceSlider>
			</view>
			<view class="grace-text grace-text-small grace-center" style="margin-top:30upx;">示例 2</view>
			<view style="padding:5px 5%; width:90%;">
				<view class="grace-text" style='text-indent:15upx;'>价格 : ￥{{priceMin}} - ￥{{priceMax}}</view>
				<graceSlider :min="100" :max="1000" :val1="priceMin" :val2="priceMax" bgColor="#00B26A" v-on:sliding="sliding2"></graceSlider>
			</view>
			<view class="grace-text grace-text-small grace-center" style="margin-top:30upx;">普通滑块</view>
			<view style="padding:5px 5%; width:90%;">
				<slider style="width:100%;" min="50" max="200" value="118" show-value/>
			</view>
		</view>
	</view>
</template>
<script>
	import graceSlider from '../../graceUI/components/graceSlider.vue';
	export default {
		data() {
			return {
				ageMin : 20,
				ageMax : 55,
				priceMin : 100,
				priceMax : 512
			}
		},
		methods: {
			sliding1:function(e){
				var min = e.min;
				var max = e.max;
				this.ageMin = min;
				this.ageMax = max;
			},
			sliding2: function (e) {
				var min = e.min;
				var max = e.max;
				this.priceMin = min;
				this.priceMax = max;
			}
		},
		components : {
			graceSlider
		}
	}
</script>
<style>

</style>
