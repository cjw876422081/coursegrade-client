<template>
	<view class="main-content">

		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
			<view v-for="(group,i) in groups" :key="i" style="margin-bottom:10rpx;" @click="groupClick(group.id)">
					<uni-swipe-action :options="group.delOptions" @click="delClick" data-course="course">

						<uni-card
						:title="group.groupName" 
						thumbnail="/static/logocolor.png" 
						:extra="group.groupCode" >
							<text>{{group.groupMemo}}</text>
						</uni-card>
					</uni-swipe-action>
			</view>
		</mescroll-uni>
		<uni-fab
			horizontal="right"
			:content="fabButtonContent"
			@trigger="addClick"
		></uni-fab>
	</view>
</template>
<style>
	.main-content{
		width:100vw;
		height:100vh;
		overflow: hidden;
	}
	.scroll-Y{
		height:100vh;
	}
	
</style>

<script>
	import uniCard from "@/components/uni-card/uni-card";
	import CourseInfo from "../../common/model/CourseInfo.js";
	import CourseService from "../../common/service/CourseService.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	import CreatedGroup from "../../common/service/CreatedGroup.js";
	
	export default {
		components:{
			uniCard,
			MescrollUni,
			uniSwipeAction,
			uniFab
		},
		data() {
			return {
				groups: [],
				pageIndex:0,
				//页长
				pageSize:10,
				createdGroup: new CreatedGroup(),
				isEnd:false,
				totalElements:0,
				downOption: { 
					use: false, // 是否启用下拉刷新; 默认true
					auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				upOption: {
					use: false, // 是否启用上拉加载; 默认true
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
				fabButtonContent: [
					{
						iconPath: '/static/add-icon.png',
						selectedIconPath: '/static/add-icon.png',
						text: '创建班级',
						active: false
					}
				]
			}
		},
		
		methods: {
			getAllCourseGroups: function() {
				this.createdGroup.getAllCourseGroups({
				}).then((result) => {
					console.log("CourseGroupService getAllCourseGroups", result.data)
					this.groups = result.data;
					console.log(this.groups);
				}).catch(err => {

				}).finally(() => {
					
				});
				
			},
			groupClick(gId){
				/* console.log("courseClick",course); */
				uni.navigateTo({
									url: '../groupStudent/groupStudent?gId=' + gId
								});
			},
			addClick(e){
				console.log("addClick",e);
				if(e.index==0){
					uni.navigateTo({
						url: '../createGroup/createGroup'
					});
				}
				
			}
			

		},
		onLoad(){
			this.getAllCourseGroups();
		}
	}
</script>
