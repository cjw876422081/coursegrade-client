<template>
	<view class="content">
		<view class="courseName">{{ list.courseName }}</view>
		<mix-tree :list="list.children" @treeItemClick="treeItemClick"></mix-tree>
		<view></view>
	</view>
</template>

<script>
import mixTree from '@/components/mix-tree/mix-tree';
import CoursePlanTeacherTreeService from '../../common/service/CoursePlanTeacherTreeService.js';
export default {
	components: {
		mixTree
	},
	data() {
		return {
			list: [],
			courseId: 0,
			coursePlanTeacherTreeService: new CoursePlanTeacherTreeService()
		};
	},
	onLoad() {
		this.courseId = 15;
		this.getCoursesPlan();
	},
	methods: {
		getCoursesPlan() {
			this.coursePlanTeacherTreeService
				.getCoursePlanTeacherTree(null, this.courseId)
				.then(result => {
					console.log('coursePlanTeacherTreeService getCoursePlanTeacherTree', result);
					if (result.data) {
						this.list = result.data;
						console.log('list', this.list);
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
		}
	}
};
</script>

<style>
.courseName {
	text-align: center;
	margin-top: 20rpx;
	
}
</style>
