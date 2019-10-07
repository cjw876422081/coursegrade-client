<template>
	<view class="main-content">
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadData">
			<uni-card
				v-for="(course, i) in courses"
				:key="i"
				:title="course.courseName"
				thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
				:extra="course.courseCode"
			>
				<text>{{ course.courseMemo }}</text>
			</uni-card>
		</scroll-view>
	</view>
</template>
<style>
.main-content {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.scroll-Y {
	height: 100vh;
}
</style>

<script>
import uniCard from '@/components/uni-card/uni-card';
import CourseInfo from '../../common/model/CourseInfo.js';
import CourseService from '../../common/service/CourseService.js';
export default {
	components: {
		uniCard
	},
	data() {
		return {
			//课程列表
			courses: [],
			//页码
			pageIndex: 0,
			//页长
			pageSize: 10,
			//关键字
			keyword: '',
			//加载遮罩
			isLoading: false,
			courseService: new CourseService(),
			isEnd: false
		};
	},
	methods: {
		//加载列表数据
		loadData(e) {
			if (e) {
				console.log('loadData e', e);
				if (e.type == 'scrolltolower' && !this.isEnd) {
					this.pageIndex += 1;
				}
			}
			if (!this.isEnd) {
				this.getCourses();
			}
		},
		getCourses() {
			this.courseService
				.getTeacherCourses({
					page: this.pageIndex,
					size: this.pageSize
				})
				.then(result => {
					console.log('CourseService getTeacherCourses', result);
					if (result.data && result.data.content) {
						if (this.pageIndex == 0) {
							this.courses = result.data.content;
						} else {
							this.courses = this.courses.concat(result.data.content);
						}
						this.isEnd = result.data.last;
						this.pageIndex = result.data.number;
						this.pageSize = result.data.numberOfElements;
					}
				})
				.catch(err => {})
				.finally(() => {});
		},
		courseClick(course) {}
	},
	onLoad() {
		this.loadData();
	}
};
</script>
