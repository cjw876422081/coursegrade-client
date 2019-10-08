<template>
	<view>
		<graceHeader title="富文本组件" desc="页面地址 : /pages/richtext"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text">
				<rich-text :nodes="nodes" bindtap="tap"></rich-text>
			</view>
			<view class="grace-text">
				<rich-text :nodes="string" bindtap="tap"></rich-text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div_class',
						style: 'line-height:50px; padding:20px 0; color:00B26A;'
					},
					children: [{
						type: 'text',
						text: 'Hello&nbsp;World!'
					}]
				}],
				string : '<div><img src="http://hcoder.oss-cn-beijing.aliyuncs.com/public/images/xcp2.png" width="100%" />grace.hcoder.net<br />富文本可以展示html标签 ^_^</div>'
			}
		},
	}
</script>
<style>
.div_class{font-size:32px;}
</style>