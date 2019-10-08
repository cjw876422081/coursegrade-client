<template>
	<view>
		<graceHeader title="滚动公告组件" desc="双向设置"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text-small grace-center" style="margin:20upx 0;">竖向滚动公告</view>
			<graceSpeaker :icon="speakerIconImg" :msgs="speakerMsgs"></graceSpeaker>
			<view class="grace-text-small grace-center" style="margin:20upx 0;">横向滚动公告</view>
			<graceSpeaker :vertical="false" :interval="5000" :icon="speakerIconImg" :msgs="speakerMsgs"></graceSpeaker>
		</view>
	</view>
</template>
<script>
import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
export default {
	data() {
		return {
			staticUrl : this.staticUrl,
			speakerIconImg: this.staticUrl + 'speaker.png',
			speakerMsgs : [
			  { title: "graceUI 更快、更好的前端UI", url: "flex", opentype: "navigate"},
			  { title: "hcoder.net - 精品 IT 课程中心", url: "../index/index", opentype: "switchTab"},
			  { title: "www.phpGrace.com - 极轻、极快的php开源框架", url: "../index/gy", opentype: "switchTab" }
			]
		}
	},
	components:{
		graceSpeaker
	}
}
</script>
<style></style>
