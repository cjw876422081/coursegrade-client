<template>
	<view>
		<graceHeader title="普通表格" desc="页面 : /pages/table2"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class='grace-stable' style='margin-top:28px;'>
				<view class='title'>
					<view>姓名</view>
					<view>年龄</view>
					<view>性别</view>
					<view>班级</view>
				</view>
				<view class='body' v-for="(item, index) in students" :key="index" :style='[index % 2 != 0 ? "background:#F1F2F3":""]'>
					<view>{{item.name}}</view>
					<view>{{item.age}}</view>
					<view>{{item.gender}}</view>
					<view>{{item.classroom}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				students:[
					{ name: "jack", age: 18, gender: "男", classroom: "一年级一班" },
					{ name: "lucy", age: 18, gender: "女", classroom: "一年级二班" },
					{ name: "小米", age: 19, gender: "男", classroom: "一年级五班" },
					{ name: "lucy", age: 18, gender: "女", classroom: "一年级二班" },
					{ name: "graceUI", age: 18, gender: "男", classroom: "hcoder" }
				]
			}
		},
	}
</script>
<style>

</style>