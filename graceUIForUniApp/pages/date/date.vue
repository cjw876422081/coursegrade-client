<template>
	<view>
		<graceHeader title="日期+时间选择组件" desc="页面路径 pages/demo/date"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view class="grace-form">
				<form bindsubmit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">出发日期</view>
						<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">出发时间</view>
						<input type="text" class="input" name="endDate" :disabled="true" :value="date2" @tap="showDate2"></input>
					</view>
				</form>
			</view>
			<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1"></graceDate>
			<graceDate :show="show2" v-on:changeDate="changeDate2" :currentHour="12" :currenMinute="58"></graceDate>
		</view>
	</view>
</view>
</template>
<script>
import graceDate from '../../graceUI/components/graceDate.vue'
export default {
	data() {
		return {
			date1 : '点击选择',
			show1 : false,
			date2: '点击选择',
			show2: false
		}
	},
	components:{
		graceDate
	},
	methods: {
		showDate1 : function(){
			this.show1 = true;
		},
		showDate2: function () {
			this.show2 = true;
		},
		changeDate1 : function(e){
			this.date1 = e;
			this.show1 = false;
		},
		changeDate2: function (e) {
			this.date2= e;
			this.show2 = false;
		}
	},
}
</script>
<style></style>