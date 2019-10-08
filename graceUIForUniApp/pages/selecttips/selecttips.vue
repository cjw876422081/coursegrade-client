<template>
	<view>
		<graceHeader title="可选标签组件" desc="radio 及 checkbox美化"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-h5 grace-blod" style="margin-top:50upx;">多选示例</view>
			<view class="grace-select-tips">
				<checkbox-group @change="graceSelectChange" name="tipName">
					<label v-for="(item, index) in graceSelectTips" :key="index" :class="[item.checked ? 'grace-checked' : '']">
						<checkbox :value="item.value" :checked="item.checked"></checkbox> {{item.name}}
					</label>
				</checkbox-group>
			</view>
			<view class="grace-h5 grace-blod" style="margin-top:50upx;">单选示例</view>
			<view class="grace-select-tips">
				<radio-group @change="graceSelectChange2" name="tipName2">
					<label v-for="(item, index) in services" :key="index" :class="[item.checked ? 'grace-checked' : '']">
						<radio :value="item.value" :checked="item.checked"></radio> {{item.name}}
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			graceSelectTips: [
				{ name: 'php', value: '0', checked: true },
				{ name: '.net', value: '1', checked: false },
				{ name: 'java', value: '2', checked: false },
				{ name: 'nodeJs', value: '3', checked: false },
				{ name: '其他', value: '4', checked: false }
			],
			services: [
				{ name: '专人配送', value: '0', checked: true },
				{ name: '精品品牌', value: '1', checked: false },
				{ name: '超值优惠', value: '2', checked: false },
				{ name: '门店自提', value: '3', checked: false },
				{ name: '三小时到', value: '4', checked: false },
			]
		}
	},
	onLoad: function () {},
	methods:{
		graceSelectChange: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.graceSelectTips.length; i++) {
				if (checkVal.indexOf(this.graceSelectTips[i].value + '') != -1) {
					this.graceSelectTips[i].checked = true;
				} else {
					this.graceSelectTips[i].checked = false;
				}
			}
			this.graceSelectTips = this.graceSelectTips;
		},
		graceSelectChange2: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.services.length; i++) {
				if (checkVal.indexOf(this.services[i].value + '') != -1) {
					this.services[i].checked = true;
				} else {
					this.services[i].checked = false;
				}
			}
			this.services = this.services;
		}
	}
}
</script>
<style></style>