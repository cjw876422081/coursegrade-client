<template>
	<!-- 教师查看单个授课内容作业 -->
	<view class="main">
		<view class="top">
			<view class="picture-box"><image src="../../static/img/login-bg.jpg" class="picture"></image></view>
			<view class="courseInformation-box">
				<form>
					<view class="courseInformation">
						<view class="courseName">授课名称</view>
						<view class="nameInput-box"><input class="nameInput" type="text" placeholder="请输入授课名称" /></view>
					</view>
					<view class="courseInformation">
						<view class="courseName">授课班级</view>
						<view class="nameInput-box"><input class="nameInput" type="text" placeholder="请输入授课班级" /></view>
					</view>
					<view class="submit-box"><button class="submit">查询</button></view>
				</form>
			</view>
		</view>

		<view class="homework-box">
			<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
				<view
					class="tab"
					v-for="(tab, index) in homeworkStatus"
					:class="[tabCurrentIndex == index ? 'grace-tab-current' : '']"
					:id="'tabTag-' + index"
					@tap="tabChange"
					:key="index"
				>
					{{ tab.text }}
				</view>
			</scroll-view>
			<swiper :current="swiperCurrentIndex" @change="swiperChange" style="height:1000upx;">
				
				<swiper-item>
					<view class="courseHomework-box" v-if="show">
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">作业代码：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入作业代码" /></view>
						</view>
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">作业名称：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入作业名称" /></view>
						</view>
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">target：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入target" /></view>
						</view>
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">分数：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入分数" /></view>
						</view>
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">人数：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入人数" /></view>
						</view>
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">时间：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入时间" /></view>
						</view>
						<view class="courseHomework-infor">
							<view class="courseHomework-hint">状态：</view>
							<view class="courseHomework-input"><input class="nameInput" type="text" placeholder="请输入时间" /></view>
						</view>
						<view>
							<button class="submit">提交</button>
						</view>
					</view>
					<view class="homework-details" v-for="(work, index) in homework" :key="index">
						<view class="workName">{{ work.name }}</view>
						<view class="workOthers">
							<view class="others">
								已参与:
								<text class="participant">{{ work.participant }}</text>
								/{{ work.total }}
							</view>
							<view class="others">分值: {{ work.csore }}</view>
							<view class="others" v-if="work.state == 0">状态:全部</view>
							<view class="others" v-if="work.state == 1">
								状态:
								<text class="others1">进行中</text>
							</view>
							<view class="others" v-if="work.state == 2">
								状态:
								<text class="others2">已结束</text>
							</view>
						</view>
						<view class="data-time">
							{{work.time}}
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="homework-details" v-for="(work, index) in homework" :key="index" v-if="work.state == 1">
						<view class="workName">{{ work.name }}</view>
						<view class="workOthers">
							<view class="others">
								已参与:
								<text class="participant">{{ work.participant }}</text>
								/{{ work.total }}
							</view>

							<view class="others">分值: {{ work.csore }}</view>
							<view class="others" v-if="work.state == 0">状态:全部</view>
							<view class="others" v-if="work.state == 1">
								状态:
								<text class="others1">进行中</text>
							</view>
							<view class="others" v-if="work.state == 2">
								状态:
								<text
								 class="others2">已结束</text>
							</view>
						</view>
						<view class="data-time">
							{{work.time}}
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="homework-details" v-for="(work, index) in homework" :key="index" v-if="work.state == 2">
						<view class="workName">{{ work.name }}</view>
						<view class="workOthers">
							<view class="others">
								已参与:
								<text class="participant">{{ work.participant }}</text>
								/{{ work.total }}
							</view>

							<view class="others">分值: {{ work.csore }}</view>
							<view class="others" v-if="work.state == 0">状态:全部</view>
							<view class="others" v-if="work.state == 1">
								状态:
								<text class="others1">进行中</text>
							</view>
							<view class="others" v-if="work.state == 2">
								状态:
								<text class="others2">已结束</text>
							</view>
						</view>
						<view class="data-time">
							{{work.time}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="">
			<button @click="handleClick" ><image src="../../static/img/add.png" class="courseHomework"></image></button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			show: false,
			follow: true,
			homeworkStatus: [
				{
					text: '全部',
					id: 'quanbu'
				},
				{
					text: '进行中',
					id: 'jinxing'
				},
				{
					text: '已结束',
					id: 'jieshu'
				}
			],

			homework: [
				{
					id: 1,
					name: '作业1',
					participant: '48',
					total: '50',
					csore: '90',
					state: '1',
					time:'2019-10-01 17:28:20'
				},
				{
					id: 2,
					name: '作业2',
					participant: '48',
					total: '50',
					csore: '100',
					state: '0',
					time:'2019-10-01 17:28:20'
				},
				{
					id: 3,
					name: '作业3',
					participant: '48',
					total: '50',
					csore: '50',
					state: '2',
					time:'2019-10-01 17:28:20'
				},
				{
					id: 4,
					name: '作业4',
					participant: '48',
					total: '50',
					csore: '50',
					state: '1',
					time:'2019-10-01 17:28:20'
				}
			]
		};
	},
	methods: {
		tabChange: function(e) {
			var index = e.target.id.replace('tabTag-', '');
			this.swiperCurrentIndex = index;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
		swiperChange: function(e) {
			var index = e.detail.current;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
		handleClick: function() {
			this.show = !this.show;
			this.follow = !this.follow;
		}
	}
};
</script>

<style>
	.courseHomework-infor{
		margin-bottom: 1.5vh;
		/* border: 1px solid #0000FF; */
	}
	.courseHomework-input{
		width: 95%;
		margin-top: 1vh;
		margin-left: 2vw;
		border-radius: 8px;
		border: 1px solid rgb(153, 201, 255);
	}
.main {
	height: 100vh;
	width: 100vw;
}
.top {
	display: flex;
	height: 30vh;
	width: 96vw;
	margin: 0 auto;
	margin-top: 1vh;
	/* border: 1px solid #000000; */
}
.picture-box {
	width: 45%;
	height: 98%;
	/* border: 1px solid #0000ff; */
}
.picture {
	width: 100%;
	height: 100%;
	border-radius: 10px;
}
.courseInformation-box {
	margin-left: 2vw;
	/* border: 1px solid #00ff00; */
}
.courseInformation {
	margin-top: 1.5vh;
	/* border: 1px solid red; */
}
.courseName {
	/* color: red; */
	font-size: 12pt;
}
.nameInput-box {
	width: 95%;
	/* height: 5vh; */
	border-radius: 8px;
	border: 1px solid rgb(153, 201, 255);
}
.submit-box {
	margin-top: 2vh;
	/* border: 1px solid #000000; */
}
.submit {
	width: 95%;
	height: 6vh;
	background: rgb(0, 122, 255);
	color: rgb(255, 255, 255);
	border-radius: 10px;
}
.homework-box {
	width: 96vw;
	margin: 0 auto;
	margin-top: 2vh;
	background: rgb(243, 243, 243);
	/* border: 1px solid #000000; */
}
.grace-tab-title {
	color: #000000;
}
.courseHomework-box{
	margin-top: 1vh;
	background: rgb(255, 255, 255);
	border: 1px solid #000000;
}
.homework-details {
	margin-top: 1vh;
	width: 100%;
	height: 20%;
	background: rgb(255, 255, 255);
	/* border: 1px solid #000000; */
}
.workName {
	width: 100;
	margin-top: 1vh;
	margin-bottom: 3vh;
	font-size: 13pt;
}
.workOthers {
	display: flex;
	/* border: 1px solid #000000; */
}
.others {
	font-size: 11pt;
	font-weight: 100;
	flex: 1;
}
.others1 {
	color: red;
}
.others2 {
	color: rgb(110, 110, 110);
}
.data-time{
	position: absolute;
	right: 0;
	margin-right: 2vw;
	font-style: italic;
}
.participant {
	color: red;
}

.courseHomework {
	width: 3rem;
	height: 3rem;
	position: fixed;
	bottom: 2rem;
	right: 0.5rem;
	z-index: 9999;
}
</style>
