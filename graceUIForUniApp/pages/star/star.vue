<template>
	<view>
		<graceHeader title="星级图标组件" desc="星标大小会随着外层大小自动调整"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text-small grace-center" style="margin-top:30px;">静态星标</view>
			<view style="width:50%; margin:0 auto;">
				<graceStar :value="currentStarNumStatic" :canTap="false"></graceStar>
			</view>
			<view class="grace-text-small grace-center" style="margin-top:30px;">可点击选择的星标</view>
			<view style="width:80%; margin:0 auto; margin-top:20upx;">
				<grace-star :value="currentStarNum" :starNum="8" v-on:starChange="starChange"></grace-star>
			</view>
		</view>
	</view>
</template>
<script>
import graceStar from "../../graceUI/components/graceStar.vue";
export default {
	data() {
		return {
			currentStarNumStatic: 4.2,
			currentStarNum: 3
		}
	},
	methods:{
		starChange: function (e) {
			console.log(JSON.stringify(e));
			uni.showToast({
				title: e + "星",
				icon:"none"
			})
		}
	},
	components:{
		graceStar
	}
}
</script>
<style></style>
