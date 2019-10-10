<template>
	<view class="container">
		<view class="top">
			<view class="box">
				<view class="avatar-box"><image :src="course.courseCover" mode="scaleToFill" class="cover"></image></view>
				<view class="info-box">
					<text class="nickname">{{ course.courseName }}</text>
				</view>
			</view>
		</view>

		<view class="grace-tab" style="margin-top:10px;">
			<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
				<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-' + index" @tap="tabChange" :key="index">
					{{ tab.name }}
				</view>
			</scroll-view>
			<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" style="height:1000upx;">
				<swiper-item>
					
				</swiper-item>
				<swiper-item>
					<view class="my-plan-style">
						<!-- 3D轮播 -->
						<view class="">
							<swiper class="imageContainer" @change="handleChange" previous-margin="50rpx" next-margin="50rpx" circular autoplay>
								<block v-for="(item, index) in imgList" :key="index">
									<swiper-item class="swiperitem">
										<image class="itemImg" :class="currentIndex == index ? 'swiperactive' : ''" :src="item" lazy-load mode="scaleToFill"></image>
									</swiper-item>
								</block>
							</swiper>
						</view>
					</view>
				</swiper-item>
				<swiper-item>更多</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
import CourseService from '../../common/service/CourseService.js';
export default {
	data() {
		return {
			courseService: new CourseService(),
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			tabs: [
				{
					name: '主页',
					id: 'guanye'
				},
				{
					name: '动态',
					id: 'dongtai'
				},
				{
					name: '更多',
					id: 'gengduo'
				}
			],
			titleShowId: 'tabTag-0',

			/* course: {
				id: 0,
				courseCode: '',
				courseCount: '',
				courseCover: '',
				courseMemo: '',
				courseName: '',
				courseUser: '',
				courseWeekCount: '',
				dataTime: ''
			} */
			course: {}
		};
	},
	onLoad: function(option) {
		uni.setNavigationBarTitle({
			title: '课程详情'
		});
		console.log(option.cId);
		this.course.id = option.cId;
	},
	onShow: function() {
		this.getCourse();
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
		getCourse: function() {
			const courseId = this.course.id;
			this.courseService
				.getCourseInfo(courseId)
				.then(result => {
					// this.getCourseInfo(courseId);
					console.log('啦啦啦', result.data);
					this.course = result.data;
				})
				.catch(err => {})
				.finally(() => {});
		}
	}
};
</script>
<style scoped>
.grace-tab-title {
	color: #000000;
}

.background {
	width: 100%;
	height: 190px;
}

.box {
	position: absolute;
	top: 35px;
	left: 85px;
	color: rgb(255, 255, 255);
}

.top {
	display: flex;
	flex-direction: column;
	text-align: center;
	margin-top: 5px;
	height: 190px;
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
	font-size: 16px;
}
.imageContainer {
	width: 100%;
	/* height: 500rpx; */
	/* background: #000; */
	height: 325upx;
	background-color: #fff;
}

.swiperitem {
	/* height: 500rpx; */
	height: 255upx;
	padding: 0upx 20upx;
	box-sizing: border-box;
	position: relative;
	.swiperText {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 56upx;
		left: 51upx;
		z-index: 998;
		width: 162upx;
		height: 163upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 8upx;
		padding: 10upx;
		.name {
			font-size: 26upx;
			font-weight: 500;
			color: rgba(253, 57, 91, 1);
			line-height: 37upx;
			margin-bottom: 10upx;
		}
		.zq,
		.cz {
			font-size: 20upx;
			color: rgba(253, 57, 91, 1);
			line-height: 35upx;
		}
		.addNl {
			width: 120upx;
			height: 26upx;
			background: rgba(253, 57, 91, 1);
			border-radius: 13upx;
			font-size: 20upx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			text-align: center;
			line-height: 26upx;
			margin-top: 10upx;
		}
	}
}

.itemImg {
	position: absolute;
	width: 95%;
	/* height: 380rpx; */
	height: 255upx;
	border-radius: 15rpx;
	z-index: 5;
	opacity: 0.7;
	top: 5%;
	box-shadow: 0px 4upx 15upx 0px rgba(153, 153, 153, 0.24);
}

.swiperactive {
	width: 95%;
	opacity: 1;
	z-index: 10;
	/* height: 430rpx; */
	height: 287upx;
	top: 0%;
	transition: all 0.2s ease-in 0s;
}

.zhankai {
	text-align: center;
	.iconfont {
		margin-left: 10upx;
	}
}
</style>
