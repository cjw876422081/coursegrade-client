<template>
	<view>
		<graceHeader title="动画库" desc="页面地址 : /pages/animate"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view :class="['demo', 'grace-animate', animateCssName]">示例</view>
		</view>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-form">
				<form>
					<view class="grace-items grace-noborder">
						<view class="grace-label">选择效果</view>
						<view class="grace-form-r">
							<picker @change="animateChange" :value="animateIndex" :range="animate">
								<text>{{animate[animateIndex]}}</text>
							</picker>
						</view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animate : [
					'bounce - 回弹',
					'flash - 闪烁',
					'pulse - 脉冲',
					'rubberBand - 橡皮筋',
					'shake - 晃动',
					'headShake - 摇头',
					'swing - 摇摆',
					'tada - 缩放加摇摆',
					'wobble - 大幅度摇摆',
					'jello - 果冻',
					'heartBeat - 心跳',
					'bounceIn - 跳动进入',
					'bounceInDown - 向下飞入',
					'bounceInLeft - 左侧飞入',
					'bounceInRight - 右侧飞入', 
					'bounceInUp - 向上飞入',
					'bounceOutDown - 向下飞出',
					'bounceOutLeft - 左侧飞出',
					'bounceOutRight - 右侧飞出',
					'bounceOutUp - 向上飞出',
					'fadeIn - 渐变进入',
					'fadeInDown - 渐变向下进入',
					'fadeInDownBig - 渐变向下进入大幅度',
					'fadeInLeft - 渐变左侧进入',
					'fadeInLeftBig - 渐变左侧进入大幅度',
					'fadeInRight - 渐变右侧进入',
					'fadeInRightBig - 渐变右侧进入大幅度',
					'fadeInUp - 渐变向上进入',
					'fadeInUpBig - 渐变向上进入大幅度',
					'fadeOut - 渐变消失',
					'fadeOutDown - 向下淡出',
					'fadeOutDownBig - 向下淡出大幅度',
					'fadeOutLeft - 左侧淡出',
					'fadeOutLeftBig - 左侧淡出大幅度',
					'fadeOutRight - 右侧淡出',
					'fadeOutRightBig - 右侧淡出大幅度',
					'fadeOutUp - 向上淡出',
					'fadeOutUpBig - 向上淡出大幅度',
					'flip - 快速翻转',
					'flipInX - 水平翻转',
					'flipInY - 垂直翻转',
					'flipOutX - 水平翻转后消失',
					'flipOutY - 垂直翻转后消失',
					'lightSpeedIn - 光速侠进入',
					'lightSpeedOut - 光速侠消失',
					'rotateIn - 旋转进入',
					'rotateInDownLeft - 旋转左下为轴',
					'rotateInDownRight - 旋转右下为轴',
					'rotateInUpLeft - 旋转左上为轴',
					'rotateInUpRight - 旋转右上为轴',
					'rotateOut - 旋转淡出',
					'rotateOutDownLeft - 旋转左下为轴淡出',
					'rotateOutDownRight - 旋转右下为轴淡出',
					'rotateOutUpLeft - 旋转左上为轴淡出',
					'rotateOutUpRight - 旋转右上为轴淡出',
					'hinge - 合页',
					'jackInTheBox - 动态盒子',
					'rollIn - 滚动进入',
					'rollOut - 滚动淡出',
					'zoomIn - 缩放进入',
					'zoomInDown - 向下缩放进入',
					'zoomInLeft - 从左缩放进入',
					'zoomInRight - 从右缩放进入',
					'zoomInUp - 向上缩放进入',
					'zoomOut - 缩放消失',
					'zoomOutDown - 向下缩放消失',
					'zoomOutLeft - 从左缩放消失',
					'zoomOutRight - 从右缩放消失',
					'zoomOutUp - 向上缩放消失',
					'slideInLeft - 左侧滑入',
					'slideInRight - 右侧滑入',
					'slideInUp - 顶部滑入',
					'slideOutDown - 底部滑出',
					'slideOutLeft - 左侧滑出',
					'slideOutRight - 右侧滑出',
					'slideOutUp - 顶部滑出'
				],
				animateIndex : 0,
				animateCssName : ''
			};
		},
		methods:{
			animateChange : function(e){
				var val = this.animate[e.detail.value];
				this.animateIndex = e.detail.value;
				var valArr = val.split(' - ');
				this.animateCssName = valArr[0];
			}
		}
	}
</script>
<style>
@import url("../../graceUI/animate.css");
.demo{width:88px; height:88px; line-height:88px; text-align:center; margin:0 auto; background:#00C777; color:#FFF;}
</style>