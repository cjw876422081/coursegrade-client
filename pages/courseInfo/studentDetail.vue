<template>
	<view class="container">
		<view class="top">
			<text class="numbers">学生详情</text>
		</view>
		<view class="avatar-box">
			<image src="../../static/img/tx1.jpg" mode="scaleToFill" class="avatar"></image>
			<view class="info-box">
				<text class="nickname">{{member.name}}</text>
				<text class="fans"> {{member.number}} 评价 {{member.level}}</text>
			</view>
		</view>
		<view class="middle">
			<text style="font-size: 20px; font-weight: bold;margin-left: 5%;">个人综合评价</text>
			<text style="color:rgb(0, 186, 221);font-size: 16px; font-weight: bold;margin-left: 5%;">* 本人</text>
			<progress percent="70" show-info color="rgb(0, 186, 221)" style="margin-left: 10px"/>
			<text style="color:rgb(76, 207, 255);font-size: 16px; font-weight: bold;margin-left: 5%;">* 班课平均</text>
			<progress percent="60" show-info color="rgb(76, 207, 255)" style="margin-left: 10px"/>
			<text style="color:rgb(221, 0, 27);font-size: 16px; font-weight: bold;margin-left: 5%;">* 优秀平均</text>
			<progress percent="90" show-info color="rgb(221, 0, 27)" style="margin-left: 10px"/>
		</view>
	</view>
</template>

<script>
	import graceCirProgress from '../../graceUI/components/graceCirProgress.vue';
	export default {
		data() {
			return {
				components: {
					graceCirProgress
				},
				member: {
					id: 1,
					name: '小太阳',
					number: 1702343001,
					time: '2019-1-1',
					level: 'A',
					finishhomeworks: 3,
					homeworkpercent:70
				}

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
	}

	.top {
		font-size: 20px;
		color: white;
		width: 100%;
		height: 40px;
		background-color: rgb(0, 186, 221);
	}

	.numbers {
		margin-left: 5%;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.avatar-box {
		display: flex;
		
		padding-left: 20px;
		margin-top: 20px;
		border-bottom: 1px solid #eee;
		padding-bottom: 10px;
	}


	.info-box {
		display: flex;
		flex-direction: column;
		padding-left: 10px;
		padding-top: 10upx;
	}

	.nickname {
		font-weight: bold;
		font-size: 25px;
	}

	.fans {
		color: rgb(153, 153, 153);
		font-size: 16px;
	}
	.middle{
		display: flex;
		flex-direction: column;
		width: 90%;
	}
</style>
