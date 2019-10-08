<template>
	<view>
		<graceHeader title="进度条组件" desc="页面路径 : /pages/progressbar"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text-small grace-blod grace-center" style='margin-top:30px;'>圆环进度条</view>
			<view class='grace-space-between' style='margin:20px 0;'>
				<view style='width:150px'>
					<graceCirProgress :width="150" :canvasId="1" :value="val1" :lineWidth="20" progressColor="#10AEFF" fontColor="#10AEFF"></graceCirProgress>
				</view>
				<view style='width:150px'>
					<graceCirProgress :width="130" :canvasId="2" :fontSize="20"  :speed="16" :value="val2"></graceCirProgress>
				</view>
			</view>
			<view class="grace-text-small grace-blod grace-center" style='margin-top:50px;'>原生进度条</view>
			<view>
				<progress percent="20" show-info />
				<progress percent="40" stroke-width="12" />
				<progress percent="60" color="pink" />
				<progress percent="80" active />
			</view>
		</view>
	</view>
</template>
<script>
import graceCirProgress from '../../graceUI/components/graceCirProgress.vue';
export default {
	data() {
		return {
			val1 : 90,
			val2 : 66
		};
	},
	components:{
		graceCirProgress
	},
	onLoad:function(){
		setTimeout(function(){this.val1 = 20;}.bind(this), 2000);
	}
}
</script>
<style>
progress{margin:12px 0;}
</style>