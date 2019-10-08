<template>
	<view>
		<graceHeader title="动画消息提醒" desc="页面路径 pages/alert "></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="btns">
				<button type='primary' @tap='showMsg1'>正确操作提醒</button>
				<button type='warn' @tap='showMsg2'>错误操作提醒</button>
				<button @tap='showMsg3'>普通消息提醒</button>
			</view>
			<graceAlert :show="show" :msg="msg" :msgtype="msgtype"></graceAlert>
		</view>
	</view>
</template>
<script>
	var alertTimer = null;
	import graceAlert from '../../graceUI/components/graceAlert.vue';
	export default {
		data() {
			return {
				show : false,
				msg : '',
				msgtype : ''
			}
		},
		methods: {
			showMsg1 : function(){
				this.show    = true;
				this.msgtype = "right";
				this.msg     = "操作成功 ^_^";
				//延迟关闭
				var _self = this;
				if (alertTimer != null) { clearTimeout(alertTimer);}
				alertTimer = setTimeout(function(){_self.show = false; _self.msg = '';}, 2000);
			},
			showMsg2: function () {
				this.show    = true;
				this.msgtype = "error";
				this.msg     = "操作失败!";
				//延迟关闭
				var _self = this;
				if (alertTimer != null) { clearTimeout(alertTimer); }
				alertTimer = setTimeout(function(){_self.show = false; _self.msg = '';}, 2000);
			},
			showMsg3: function () {
				this.show    = true;
				this.msgtype = "msg";
				this.msg     = "Hi! I am GraceUI alert ^_^";
				//延迟关闭
				var _self = this;
				if (alertTimer != null) { clearTimeout(alertTimer); }
				alertTimer = setTimeout(function(){_self.show = false; _self.msg = '';}, 2000);
			}
		},
		components : {
			graceAlert
		}
	}
</script>
<style>
.btns{width:88%; padding:50upx 6%;}
.btns button{width:100%; margin:20upx 0;}
</style>