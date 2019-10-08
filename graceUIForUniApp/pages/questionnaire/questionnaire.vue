<template>
	<view>
		<view class='grace-qn-step'>
		  {{currentQN + 1}} / <text>{{qns.length}}</text>
		</view>
		<view class="grace-form">
		  <form @submit="formSubmit">
			<swiper class="grace-qn-swiper" :current="currentQN" @change="swiperChange" :style="{height:swiperHeight+'px'}">
			  <swiper-item v-for="(item, index) in qns" :key="index">
				<view class='grace-qn-in' :style="{height:swiperHeight+'px'}">
				  <view class='grace-qn-q'>{{item.ask}}</view>
				  <view class="grace-items" style="margin:15px 0; border:0;">
					<view class="grace-label-y" v-if="item.type == 'radio'">
					  <radio-group :name="'answer'+index">
						<label v-for="(answer, answerIndex) in item.answer" :key="answerIndex" style="margin:15px 0;">
						  <radio :value="answerIndex+''" :checked="false"></radio>{{answer}}
						</label>
					  </radio-group>
					</view>
					<view class="grace-label-y" v-if="item.type == 'checkBox'">
					  <checkbox-group :name="'answer'+index">
						<label v-for="(answer, answerIndex) in item.answer" :key="answerIndex" style="margin:15px 0;">
						  <checkbox :value="answerIndex+''" :checked="false"></checkbox>{{answer}}
						</label>
					  </checkbox-group>
					</view>
				  </view>
				</view>
			  </swiper-item>
			</swiper>
			<view class="grace-footer" v-if="currentQN + 1 < qns.length" @tap="next">
			  下一题
			</view>
			<view class="grace-footer" v-if="currentQN + 1 >= qns.length">
			  <button form-type="submit" type='warn'>提交</button>
			</view>
		  </form>
		</view>
	</view>
</template>
<script>
var _self;
export default {
	data() {
		return {
			currentQN : 0, // 当前题目
			swiperHeight : 200,
			qns : [], // 问卷数据
		};
	},
	onLoad:function(){
		_self = this;
		// 加载问卷信息
		uni.request({
		  url: 'https://www.easy-mock.com/mock/5bb833775df5622d84ac87ca/example/qn#!method=get',
		  success:function(res){
			_self.qns = res.data.data;
		  }
		});
		// 计算屏幕高度
		wx,wx.getSystemInfo({
		  success: function(res) {
			// swiper 高度 = 屏幕高度 - 顶部步骤高度 - 底部按钮高度
			_self.swiperHeight = res.screenHeight - 180;
		  }
		});
	},
	methods:{
		swiperChange : function(e){
			this.currentQN = e.detail.current;
		  },
		  formSubmit : function(e){
			//检查数据
			var data = e.detail.value;
			var checkError = false;
			var errorIndex = 0;
			for(var k in data){
			  if(data[k] == '' || data[k].length < 1){
				console.log('no');
				checkError = k;
				break;
			  }
			  errorIndex++;
			}
			if (checkError){
			  uni.showToast({
				title: '请完善选择',
				icon: "none"
			  });
			  _self.currentQN = errorIndex;
			  return ;
			}
			uni.showToast({
			  title: '请观察控制台',
			});
			console.log(data);
		  },
		  next : function(){
			this.currentQN++;
		  }
	}
}
</script>
<style>
page{background:#FFF;}
.grace-qn-step{margin:15px 0; line-height:30px; text-align:center; font-size:26px; font-style:italic; color:#09BB07;}
.grace-qn-step text{font-size:18px; color:#555;}
.grace-qn-swiper{width:750upx;}
.grace-qn-in{width:90%; margin:0 5%; height:300px;}
.grace-qn-q{text-align:center; font-weight:700; color:#555; font-size:18px; margin-top:15px;}
.grace-footer{background:#09BB07; color:#FFF; font-size:16px; line-height:90rpx; text-align:center; justify-content:center;}
</style>