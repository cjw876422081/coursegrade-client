<template>
	<view class="container">
		<view class="top">
			<view class="avatar-box"><image :src="course.courseCover" mode="scaleToFill" class="cover"></image></view>
		</view>

		<view class="grace-tab" style="margin-top:10px;">
			<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
				<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-' + index" @tap="tabChange" :key="index">
					{{ tab.name }}
				</view>
			</scroll-view>
			<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange" style="height:1000upx;">
				<swiper-item>
					<uni-list-item title="课程名称" :note="course.courseName"></uni-list-item>
					<uni-list-item title="课程总数" :note="course.courseCount" show-arrow="true"></uni-list-item>
					<uni-list-item title="课程描述" :note="course.courseMemo" show-arrow="false"></uni-list-item>
					<uni-list-item title="课程周数" :note="course.courseWeekCount" show-arrow="false"></uni-list-item>
					<uni-list-item title="创建时间" :note="handleTime(course.dataTime)" show-arrow="false"></uni-list-item>
				</swiper-item>
				<!-- <text>{{handleTime(course.dateTime)}}</text> -->
				<swiper-item>
					<!-- <uni-collapse accordion="true">
					    <uni-collapse-item title="标题文字">
					        <view style="padding: 30upx;">
					            手风琴效果
					        </view>
					    </uni-collapse-item>
					    <uni-collapse-item title="标题文字">
					       <uni-list-item title="基本资料" show-arrow="false" disabled="true"></uni-list-item>
					    </uni-collapse-item>
					    <uni-collapse-item title="标题文字">
					        <view style="padding: 30upx;">
					            手风琴效果
					        </view>
					    </uni-collapse-item>
					</uni-collapse> -->
					<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback">
						<view v-for="(homework, i) in homeworks" :key="i" style="margin-bottom:10rpx;" @click="homeworkClick(homework.id)">
							<uni-swipe-action :options="homework.delOptions" @click="delClick" data-course="homework">
								<uni-card :title="homework.homeworkMemo" :extra="homework.homeworkCode">
									<view class="code">
										<text>{{ homework.homeworkCode }}</text>
										<view class="time">
											<text>{{ handleTime(homework.dataTime) }}</text>
										</view>
									</view>

									<view style="border-bottom: #E0E0E0 1px solid; margin-top: 5px;"></view>
								</uni-card>
							</uni-swipe-action>
						</view>
					</mescroll-uni>
					<view class="btn">
						<button class="circle-btn" @tap="gotoDetail(course.id)"><text class="icon-text">+</text></button>
					</view>
				</swiper-item>
				<swiper-item>
					<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback">
						<view v-for="(note, i) in notes" :key="i" style="margin-bottom:10rpx;">
							<uni-swipe-action @click="delClick" data-course="note">
								<uni-card :title="note.noteMemo" :extra="note.noteType">
									<view class="note">
										<view class="code">
											<text>笔记描述:{{ note.noteMemo }}</text>
										</view>
										<view>
											<text>笔记类型：{{ note.noteType }}</text>
										</view>
										<view style="border-bottom: #E0E0E0 1px solid; margin-top: 5px;"></view>
									</view>
								</uni-card>
							</uni-swipe-action>
						</view>
					</mescroll-uni>
					<view class="btn">
						<button class="circle-btn" @tap="gotoNote"><text class="icon-text">+</text></button>
					</view>
				</swiper-item>

				<swiper-item>
					<!-- 授课内容 -->
					<view class="addButton"><button class="mini-btn" type="default" size="mini" @click="addCoursePlan">添加章节</button></view>
					<mix-tree :list="list"></mix-tree>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
import CourseService from '../../common/service/CourseService.js';
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import uniCard from '@/components/uni-card/uni-card';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import mixTree from '@/components/mix-tree/mix-tree';
import CoursePlanTeacherTreeService from '../../common/service/CoursePlanTeacherTreeService.js';
export default {
	components: {
		uniGrid,
		uniList,
		uniListItem,
		uniCollapse,
		uniCollapseItem,
		mixTree
	},
	data() {
		return {
			//授课内容
			list: [],
			coursePlanTeacherTreeService: new CoursePlanTeacherTreeService(),

			courseService: new CourseService(),
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			//页码
			pageIndex: 0,
			//页长
			pageSize: 10,
			tabs: [
				{
					name: '课程详情',
					id: 'guanye'
				},
				{
					name: '作业',
					id: 'dongtai'
				},
				{
					name: '笔记',
					id: 'gengduo'
				},
				{
					name: '授课内容',
					id: 'shouke'
				},
				{
					name: '班级',
					id: 'banji'
				}
			],
			titleShowId: 'tabTag-0',
			course: {},
			homeworks: [],
			notes: [],
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
			},
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂未查询到数据'
				}
			},
			parmeter: {
				courseId: 0,
				courseName: '',
				planMemo: []
			}
		};
	},
	onLoad: function(option) {
		uni.setNavigationBarTitle({
			title: '课程详情'
		});
		console.log(option.cId);
		this.course.id = option.cId;
		this.getCoursesPlan();
	},
	onShow: function() {
		this.getCourse();
		this.getCourseHomework();
		this.getCoursePlan();
		// this.getCoursesPlan();
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
		},
		getCourseHomework: function() {
			const courseId = this.course.id;
			this.courseService
				.getCourseHomework(courseId)
				.then(result => {
					// this.getCourseInfo(courseId);
					console.log('zhangwenxv', result.data);
					this.homeworks = result.data;
				})
				.catch(err => {})
				.finally(() => {});
		},
		getCoursePlan: function() {
			const courseId = this.course.id;
			const page = this.pageIndex; //页码
			const size = this.pageSize; //页长
			const type = '课程';
			this.courseService
				.getCoursePlan(courseId, page, size, type)
				.then(result => {
					console.log('plans', result.data.content);
					this.notes = result.data.content;
				})
				.catch(err => {})
				.finally(() => {});
		},
		homeworkClick(hId) {
			/* console.log("courseClick",course); */
			uni.navigateTo({
				url: '../homeworkNote/homeworkNote?hId=' + hId
			});
		},
		delClick(e) {
			console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text, e);
			if (e.content) {
				const homeworkId = e.content.homeworkId;
				this.courseService
					.delHomewoIdrk(homeworkId)
					.then(result => {
						this.deleteHomework(homeworkId);
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: err.data.title
						});
					})
					.finally(() => {});
			}
		},
		gotoDetail: function(cId) {
			uni.navigateTo({
				url: '../createHomework/createHomework?cId=' + cId
			});
		},
		gotoNote: function() {
			uni.navigateTo({});
		},
		handleTime: function(date) {
			var d = new Date(date);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
			var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
			var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		},
		//授课内容
		getCoursesPlan() {
			const courseId = this.course.id;
			console.log('courseId：' + courseId);
			this.coursePlanTeacherTreeService
				.getCoursePlanTeacherTree(null, courseId)
				.then(result => {
					console.log('coursePlanTeacherTreeService getCoursePlanTeacherTree', result);
					if (result.data) {
						this.list = result.data;
						console.log('授课内容-----------list：', this.list);
					}
				})
				.catch(err => {})
				.finally(() => {});
		},
		//点击最后一级时触发该事件
		treeItemClick(item) {
			let { id, planMemo, parentId } = item;
			uni.showModal({
				content: `点击了${parentId.length + 1}级菜单, ${planMemo.toString()}, id为${id}, 父id为${parentId.toString()}`
			});
			console.log(item);
		},
		addCoursePlan() {
			this.parmeter = {
				courseId: 0,
				courseName: '',
				planMemo: []
			};
			this.parmeter.courseId = this.course.id;
			this.parmeter.courseName = this.course.courseName;
			console.log(this.parmeter);
			uni.navigateTo({
				url: '../creatCoursePlan/creatCoursePlan?parmeter=' + encodeURIComponent(JSON.stringify(this.parmeter))
			});
		}
	}
};
</script>
<style scoped>
.container {
	width: 100%;
}
.cover {
	width: 100%;
}
.avatar-box {
	width: 100%;
	height: 100px;
}

.info-box {
	padding-top: 140px;
}
.grace-tab-title {
	color: #000000;
}
/* 
.background {
	width: 100%;
	height: 190px;
} */

.grace-tab {
	padding-top: 50px;
}
.top {
	display: flex;
	flex-direction: column;
	margin-top: 5px;
	height: 190px;
	width: 100%;
}

/* 
.imageContainer {
	width: 100%;
	height: 500rpx; 
	 background: #000;
	height: 325upx;
	background-color: #fff;
}
 */
.main-content {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.scroll-Y {
	height: 100vh;
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
		left: 30upx;
		z-index: 998;
		width: 100upx;
		height: 163upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 8upx;
		padding: 5upx;
		.name {
			font-size: 26upx;
			font-weight: 500;
			color: rgba(253, 57, 91, 1);
			line-height: 37upx;
			margin-bottom: 10upx;
		}
		/* 	.zq,
		.cz {
			font-size: 20upx;
			color: rgba(253, 57, 91, 1);
			line-height: 35upx;
		} */
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
	width: 100%;
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
	height: 430rpx;
	height: 287upx;
	top: 0%;
	transition: all 0.2s ease-in 0s;
}
.circle-btn {
	position: absolute;
	bottom: 65px;
	right: 15px;
	position: fixed;
	width: 58px;
	height: 58px;
	border-radius: 50%;
	background-color: #de533a;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	box-shadow: 2px 5px 10px #aaa;
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
.grade {
	margin-right: 100px;
}
.courseName {
	text-align: center;
	margin-top: 20rpx;
}
.addButton {
	text-align: center;
	margin-top: 10px;
}
</style>
