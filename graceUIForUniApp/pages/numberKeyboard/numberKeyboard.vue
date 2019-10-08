<template>
	<view>
		<graceHeader title="数字键盘" desc="页面地址 : /pages/numberKeyboard"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">金额示例</view>
						<input type="text" class="input" v-model="numberVal" disabled @tap="showKeyboard" placeholder="请输入金额" name="name"></input>
					</view>
				</form>
			</view>
		</view>
		<!-- 数字键盘组件 -->
		<graceNumberKeyboard 
			:show="graceNumberKeyboardShow" 
			v-on:keyboardDone="keyboardDone" 
			v-on:keyboardInput="keyboardInput" 
			v-on:keyboardDelete="keyboardDelete">
		</graceNumberKeyboard>
	</view>
</template>
<script>
import graceNumberKeyboard from '../../graceUI/components/graceNumberKeyboard.vue'
export default {
	data() {
		return {
			graceNumberKeyboardShow : false,
			numberVal : ''
		};
	},
	methods: {
		showKeyboard : function () {
			//打开数字键盘
			this.graceNumberKeyboardShow = true;
		},
		// 监听输入
		keyboardInput : function(e){
			this.numberVal = this.numberVal + '' + e;
		},
		// 监听删除
		keyboardDelete : function(){
			this.numberVal = this.numberVal.substring(0, this.numberVal.length - 1);
		},
		// 完成事件
		keyboardDone : function(){
			this.graceNumberKeyboardShow = false;
		}
	},
	components :{
		graceNumberKeyboard
	}
}
</script>
<style>
page{background:#FFF;}
</style>