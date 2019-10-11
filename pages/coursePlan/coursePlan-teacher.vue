<template>
	<view class="content">
		<view class="courseName">{{ list.courseName }}</view>
		<view class="addButton">
			<button class="mini-btn" type="default" size="mini" @click="addCoursePlan">添加章节</button>
		</view>
		<mix-tree :list="list.children"></mix-tree>
		<!-- @treeItemClick="treeItemClick" -->
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
	onLoad(option) {
		this.courseId = option.courseId;
		console.log('courseId:' + this.courseId);
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
		},
		addCoursePlan(){
			// console.log(JSON.stringify(this.list));
			uni.showToast({
			    title: '显示:' + JSON.stringify(this.list.id),
			    duration: 2000
			});
			uni.navigateTo({
			    url: '添加授课内容路径'
			});
		}
	}
};
</script>

<style>
.courseName {
	text-align: center;
	margin-top: 20rpx;
}
.addButton{
	text-align: center;
	margin-top: 10px;
}
</style>
