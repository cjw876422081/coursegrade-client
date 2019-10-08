<template>
	<view>
		<graceHeader title="富文本加强组件" desc="调用方便，可配置，大幅度优化富文本组件；"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<rich-text type="text" :nodes="demoHtml"></rich-text>
		</view>
	</view>
</template>
<script>
var _self;
var graceRichText = require("../../graceUI/jsTools/richText.js");
export default {
	data() {
		return {
			demoHtml : ''
		};
	},
	onLoad:function(){
		_self = this;
		// 加载 html 内容
		uni.request({
			url:'http://grace.hcoder.net/richTextDemo.php',
			success:function(res){
				// 强化 richText
				_self.demoHtml = graceRichText.format(res.data);
			}
		});
	},
	methods:{
		
	}
}
</script>
<style>
.div_class{font-size:32px;}
</style>
