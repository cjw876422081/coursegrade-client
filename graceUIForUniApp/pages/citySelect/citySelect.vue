<template>
	<view>
		<graceHeader title="三级城市联动" desc="页面路径 pages/demo/citySelect"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">居住城市</view>
						<view @click="cityPicker1" class="grace-form-r">
							{{cityText1}}
							<text class="grace-iconfont icon-arrow-right"></text>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">期望城市</view>
						<view @click="cityPicker2" class="grace-form-r">
							{{cityText2}}
							<text class="grace-iconfont icon-arrow-right"></text>
						</view>
					</view>
					<view style="padding:22upx 0;">
						<button formType="submit" type="primary" style="width:100%;">提交</button>
					</view>
				</form>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1" @onCancel="onCancel1" @onConfirm="onConfirm1"></mpvue-city-picker>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker2" :pickerValueDefault="cityPickerValueDefault2" @onCancel="onCancel2" @onConfirm="onConfirm2"></mpvue-city-picker>
		</view>
	</view>
</template>
<script>
import mpvuePicker from '../../threeComponents/mpvuePicker.vue';
import mpvueCityPicker from '../../threeComponents/mpvueCityPicker.vue';
export default {
	data() {
		return {
			themeColor: '#007AFF', //颜色
			cityText1 : "点击选择", //文本
			cityPickerValueDefault1 : [0,0,1], //默认选项
			cityText2 : "点击选择",
			cityPickerValueDefault2 : [0,0,1],
			//记录全部信息用于表单提交
			city1 : null,
			city2 : null
		}
	},
	methods:{
		cityPicker1 : function(){
			this.$refs.mpvueCityPicker1.show();
		},
		onConfirm1(e) {
			var cityText1  = e.label;
			var cityValue1 = e.value;
			var cityCode1  = e.cityCode;
			console.log(cityText1, cityValue1, cityCode1);
			this.cityText1 = cityText1;
			this.cityPickerValueDefault1 = cityValue1;
			this.city1 = e;
		},
		cityPicker2 : function(){
			this.$refs.mpvueCityPicker2.show();
		},
		onConfirm2(e) {
			var cityText2  = e.label;
			var cityValue2 = e.value;
			var cityCode2  = e.cityCode;
			console.log(cityText2, cityValue2, cityCode2);
			this.cityText2 = cityText2;
			this.cityPickerValueDefault2 = cityValue2;
			this.city2 = e;
		},
		//表单提交
		formSubmit : function(){
			//表单验证
			if(this.city1 == null || this.city2 == null){
				uni.showToast({title : "请选择城市", icon:"none"});
				return ;
			}
			//获取城市信息 保存完整的城市信息 {lable - 文字 , value - 数组index记录, cityCode : 城市编号}
			//请根据实际需求选择要使用的数据
			console.log(JSON.stringify(this.city1));
			console.log(JSON.stringify(this.city2));
			uni.showToast({title : "请观看控制台", icon:"none"});
		}
	},
	components: {
		mpvuePicker,
		mpvueCityPicker
	}
}
</script>
<style>
.picker{background:#00B26A; width:100%; line-height:40px;}
</style>