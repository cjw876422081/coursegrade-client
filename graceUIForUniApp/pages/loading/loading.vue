<template>
	<view>
		<graceHeader title="loading 组件" desc="请点击按钮测试 ^_^"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<graceLoading :loadingType="loadingType" :loadingText="loadingText" :show="show"></graceLoading>
			<button type="primary" @tap="startLoading">开启 Loading</button>
			<button type="default" @tap="closeLoading">关闭 Loading</button>
		</view>
	</view>
</template>
<script>
import graceLoading from '../../graceUI/components/graceLoading.vue';
export default {
	data() {
		return {
			show : false,
			loadingType : 1,
			loadingText:['加载更多','loading ......','已加载全部']
		}
	},
	methods:{
		startLoading : function(){
			this.show = true;
		},
		closeLoading: function () {
			this.show = false;
		}
	},
	components: {
		graceLoading
	}
}
</script>
<style>
button{width:80%; margin:15upx 10%;}
</style>