<template>
	<view class="main-content">
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="refreshData" @scrolltolower="getNextPage">
				
		</scroll-view>
	</view>
</template>

<script>
	import CourseInfo from '../../common/model/CourseInfo.js';
	import CourseService from '../../common/service/CourseService.js';
	export default {
		data() {
			return {
				courseInfo:CourseInfo,
				page:0,
				size:10,
				courseService:new CourseService()
			}
		},
		onLoad:function(){
			this.courseInfo=new CourseInfo({
				courseCode:'test-code',
				courseName:'test-name',
				abc:"test-abc"
			});
			this.courseService.getTeacherCourses({page:this.page,size:this.size});
			console.log("courseHomework vue",this.courseInfo)
		},
		methods: {
			refreshData:function(e){
				
			},
			getNextPage:function(e){
				
			}
		}
	}
</script>

<style>
	
</style>
