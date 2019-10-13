<template>
	<view class="main-content">
	
		<mescroll-uni :down="downOption"  @down="downCallback" :up="upOption" @up="upperCallback" >
			<!-- <view><text>{{students.group.groupName}}</text></view> -->
			<view v-for="(student,i) in students" :key="i" style="margin-bottom:10rpx;">
						<uni-card
						:title="student.student" 
						thumbnail="/static/logocolor.png" >
							<text>加入时间:{{student.joinTime}}</text>							
						</uni-card>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card";
	import CourseInfo from "../../common/model/StudentCourseGroup.js";
	import StudentCourseGroupService from "../../common/service/StudentCourseGroupService.js";
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
				students:[],
				//页码
				pageIndex:0,
				//页长
				pageSize:3,
				courseGroupId:2,
				studentCourseGroupservice:new StudentCourseGroupService(),
				isEnd:true,
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
						size: 3 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂未查询到数据'
					}
				}
			}
		},
		methods: {
			downCallback(mescroll){
				console.log("down",mescroll);
				this.pageIndex=0;
				this.getStudents(()=>{
					mescroll.resetUpScroll();
				});
			},
			upperCallback(mescroll){
				console.log("upper",mescroll);
				this.pageIndex=mescroll.num;
				this.getStudents(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
			},
			getStudents(callback){
				//调用CourseService获取教师已创建课程的列表方法，CourseService为封装的服务调用类
				this.studentCourseGroupservice.getStudentCourseGroup(this.courseGroupId,{
					page:this.pageIndex,
					size:this.pageSize,
				})
				.then((result)=>{//.then表示成功响应的回调函数，result是获取到的数据
					console.log("studentServiceResult>",result)//调试：在控制台输出返回值
					console.log("数据：",result.data.content);
					
					if(this.pageIndex==0){//如果是获取的第一页数据，则覆盖students数组
							this.students=result.data.content;
						}else{
							//如果是后续页码的数据，则不能覆盖，需要追加到students数组中
							this.students=this.students.concat(result.data.content);
						}
						//如果已经是最后一页，为isEnd变量赋值
						this.isEnd=result.data.last;
						//使用当前返回的页码覆盖界面上的页码，以确保翻页准确
						this.pageIndex=result.data.number;
						//获取记录总数;
						this.totalElements=result.data.totalElements;
				}).catch(err=>{//这里是获取数据报错的分支
					
				}).finally(()=>{//这里是无论成功失败都会进入的分值
					if(callback){//如果存在回调函数，则执行。
						callback();
					}
				});
			},
			
		},
		onLoad(option) {
			console.log(option.gId);
			this.courseGroupId = option.gId;
		}
	}
	
</script>

<style>

</style>
