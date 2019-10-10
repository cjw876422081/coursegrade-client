<template>
	<view class="main-content">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
			<view v-for="(course,i) in courses" :key="i" style="margin-bottom:10rpx;" @click="courseClick(course.id)">
					<uni-swipe-action :options="course.delOptions" @click="delClick" data-course="course">
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
				//调用CourseService获取教师已创建课程的列表方法，CourseService为封装的服务调用类
				this.courseService.getTeacherCourses({
					page:this.pageIndex,//页码
					size:this.pageSize//页长
				}).then((result)=>{//.then表示成功响应的回调函数，result是获取到的数据
					console.log("CourseService getTeacherCourses",result)//调试：在控制台输出返回值
					if(result.data && result.data.content){//如果结果不为空
						result.data.content.forEach((item)=>{
							item.delOptions=[{
									text: '删除',
									style: {
									    backgroundColor: '#FF7b00'
									},
									courseId:item.id
								}]
						});//为每一个课程增加一个delOptions的属性，该属性用于绑定在左滑删除操作
						console.log("deloptions add",result.data.content);
						if(this.pageIndex==0){//如果是获取的第一页数据，则覆盖courses数组
							this.courses=result.data.content;
						}else{
							//如果是后续页码的数据，则不能覆盖，需要追加到courses数组中
							this.courses=this.courses.concat(result.data.content);
						}
						//如果已经是最后一页，为isEnd变量赋值
						this.isEnd=result.data.last;
						//使用当前返回的页码覆盖界面上的页码，以确保翻页准确
						this.pageIndex=result.data.number;
						//获取记录总数;
						this.totalElements=result.data.totalElements;
					}
				}).catch(err=>{//这里是获取数据报错的分支
					
				}).finally(()=>{//这里是无论成功失败都会进入的分值
					if(callback){//如果存在回调函数，则执行。
						callback();
					}
				});
			},
			courseClick(cId){
				/* console.log("courseClick",course); */
				uni.navigateTo({
									url: '../courseDetails/courseDetails?cId=' + cId
								});
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

