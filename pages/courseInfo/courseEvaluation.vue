<template>
	<view class="container">
		<view class="top">
			<text class="numbers">成员总数：<text style="margin-left: 50%;">{{members.length}}人</text> </text>
		</view>
		<view class="member-list" v-for="(member,index) in members" :key="index">
			<view class="left" >
				<text style="margin: 5%;">{{index+1}}
					<text style="margin-left: 20px;font-weight: bold;font-size: 16px;" @tap="gotoDetail">{{member.name}}</text>
					<text style="margin-left: 20px;font-size: 16px;color: rgb(110,110,110);">{{member.number}}</text>
				</text>
				<text style="margin-left: 20px;font-size: 16px;">作业完成情况：<text style="color: rgb(244, 143, 01);font-weight: bold;font-size: 18px;">{{member.finishhomeworks}}次</text></text>
				<text style="margin-left: 20px;font-size: 16px;">作业质量评估：<text style="color: rgb(244, 143, 01);font-weight: bold;">{{member.homeworkpercent}}%</text></text>
				<text style="margin-left: 20px;font-size: 13px;color: rgb(110,110,110);">评估时间:{{member.time}}</text>
				<progress percent="70" show-info color="rgb(0, 186, 221)" style="margin-left: 20px;"/>
			</view>
			<view class="right">
				<graceCirProgress :width="130" :canvasId="2" :fontSize="20"  :speed="16" :value="member.homeworkpercent" progressColor="rgb(0, 186, 221)"
				  fontColor="rgb(0, 186, 221)"></graceCirProgress>
			</view>

		</view>
	</view>
</template>

<script>
	import graceCirProgress from '../../graceUI/components/graceCirProgress.vue';
	export default {
		data() {
			return {
				val1: 100,
				val2:66,
				members: [{
						id: 1,
						name: '小太阳1号',
						number: 1702343001,
						time: '2019-1-1',
						finishhomeworks: 3,
						homeworkpercent:70
					},
					{
						id: 2,
						name: '小太阳2号',
						number: 1702343001,
						time: '2019-1-1',
						finishhomeworks: 4,
						homeworkpercent:70
					},
					{
						id: 3,
						name: '小太阳3号',
						number: 1702343001,
						time: '2019-1-1',
						finishhomeworks: 5,
						homeworkpercent:60
					},
					{
						id: 4,
						name: '小太阳4号',
						number: 1702343001,
						time: '2019-1-1',
						finishhomeworks: 6,
						homeworkpercent:70
					},
					{
						id: 4,
						name: '小太阳5号',
						number: 1702343001,
						time: '2019-1-1',
						finishhomeworks: 8,
						homeworkpercent:80
					}
				]
			}
		},
		components: {
			graceCirProgress
		},
		onLoad: function() {
			setTimeout(function() {
				this.val1 = 60;
			}.bind(this), 2000);
		},
		methods: {
			gotoDetail: function() {
				uni.navigateTo({
					url: '../courseInfo/studentDetail'
				});
			}
		}
	}
</script>

<style scoped>
	progress {
		margin: 12px 0;
	}

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

	.member-list {
		padding-bottom: 10px;
		border-bottom: 1px solid #eee;
		display: flex;
	}

	.left {
		display: flex;
		flex-direction: column;
		width: 60%;
	}

	.right {
		padding-right:10px;
		margin-top: 20px;
		
	}
</style>
