<template>
	<view>
		<graceHeader title="数字输入框组件" desc="页面路径 : /pages/numberBox"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">默认值 5</view>
						<graceNumberBox :value="5"></graceNumberBox>
					</view>
					<view class="grace-items">
						<view class="grace-label">禁用输入</view>
						<graceNumberBox :value="1" :disabled="true"></graceNumberBox>
					</view>
					<view class="grace-items">
						<view class="grace-label">限制 1-5</view>
						<graceNumberBox :value="1" :maxNum="5" :minNum="1"></graceNumberBox>
					</view>
					<view class="grace-items">
						<view class="grace-label">事件回调</view>
						<graceNumberBox :index="1" :value="1" :maxNum="5" :minNum="1" v-on:change="change"></graceNumberBox>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
import graceNumberBox from "../../graceUI/components/graceNumberBox.vue";
export default {
	data() {
		return {
			
		};
	},
	methods:{
		change : function(data){
			console.log(data);
			uni.showToast({
				title:"值 : "+data[0] + " index : "+data[1],
				icon:"none"
			})
		}
	},
	components:{
		graceNumberBox
	}
}
</script>
<style>

</style>