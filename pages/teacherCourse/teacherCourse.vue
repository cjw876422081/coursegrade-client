<template>
	<view class="main-content">
		<mescroll-uni :down="downOption" 
					  @down="downCallback" 
					  :up="upOption" 
					  @up="upperCallback" >
			<view v-for="(course,i) in courses" :key="i" 
				  style="margin-bottom:10rpx;" 
				  @click="courseClick(course)">
					<uni-swipe-action :options="course.delOptions" 
									  @click="delClick" 
									  data-course="course">
						<uni-card
						:title="course.courseName" 
						thumbnail="/static/logocolor.png" 
						:extra="course.courseCode" >
							<text>{{course.courseMemo}}</text>
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
	export default {
		components:{
			uniCard,
			MescrollUni,
			uniSwipeAction,
			uniFab
		},
		data() {
			return {
				//课程列表
				courses:[],
				//页码
				pageIndex:0,
				//页长
				pageSize:10,

				courseService:new CourseService(),
				isEnd:false,
				totalElements:0,
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
				fabButtonContent: [
					{
						iconPath: '/static/add-icon.png',
						selectedIconPath: '/static/add-icon.png',
						text: '创建课程',
						active: false
					}
				]
			}
		},
		methods: {
			downCallback(mescroll){
				console.log("down",mescroll);
				this.pageIndex=0;
				this.getCourses(()=>{
					mescroll.resetUpScroll();
				});
			},
			upperCallback(mescroll){
				console.log("upper",mescroll);
				this.pageIndex=mescroll.num;
				this.getCourses(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
			},
			getCourses(callback){
				this.courseService.getTeacherCourses({
					page:this.pageIndex,
					size:this.pageSize
				}).then((result)=>{
					console.log("CourseService getTeacherCourses",result)
					if(result.data && result.data.content){
						result.data.content.forEach((item)=>{
							item.delOptions=[{
									text: '删除',
									style: {
									    backgroundColor: '#FF7b00'
									},
									courseId:item.id
								}]
						});
						console.log("deloptions add",result.data.content);
						if(this.pageIndex==0){
							this.courses=result.data.content;
						}else{
							this.courses=this.courses.concat(result.data.content);
						}
						
						this.isEnd=result.data.last;
						this.pageIndex=result.data.number;
						//this.pageSize=result.data.numberOfElements;
						this.totalElements=result.data.totalElements;
					}
				}).catch(err=>{
					
				}).finally(()=>{
					if(callback){
						callback();
					}
				});
			},
			courseClick(course){
				console.log("courseClick",course);
			},
			delClick(e){
				
				console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text,e)
				if(e.content){
					const courseId=e.content.courseId;
					this.courseService.delCourse(courseId).then((result)=>{
						this.deleteCourse(courseId);
					}).catch((err)=>{
						uni.showToast({
						    icon:'none',
						    title: err.data.title
						});
					}).finally(()=>{
						
					})
				}
			},
			deleteCourse(courseId){
				for(let i=0;i<this.courses.length;i++){
					const course=this.courses[i];
					if(course.id===courseId){
						console.log("delete courseid",courseId);
						this.courses.splice(i,1);
						break;
					}
				}
				
			},
			addClick(e){
				console.log("addClick",e);
				uni.navigateTo({
					url: '../createCourse/createCourse'
				});
			}
		},
		onLoad() {
			
		}
	}
</script>


