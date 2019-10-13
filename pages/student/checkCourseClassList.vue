<template>
	<view class="main-content">
				<t-table border="2"  :is-check="false" >
					<t-tr font-size="20" color="black" align="center">
					    <t-th>{{ courseName }}课程开班信息</t-th>
					</t-tr>
				    <t-tr font-size="15" color="black" align="left">
				        <t-th align="left">班级</t-th>
				        <t-th align="left">人数</t-th>
				    </t-tr>
				    <view v-for="(courseGroup,i) in classes" :key="i" @click="classclick(courseGroup.id,courseGroup.groupName)">
						<t-tr font-size="15" color="black" align="left" >
				        <t-td align="left" >{{courseGroup.groupName}}</t-td>
						<t-td align="left">{{courseGroup.groupCount}} </t-td>
				    </t-tr>
					</view>
				</t-table>
		</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card";
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import CourseInfo from "../../common/model/StudentCourseGroup.js";
	import StudentCourseGroupService from "../../common/service/StudentCourseGroupService.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	import CourseService from "../../common/service/CourseService.js";
	export default {
		components:{
			uniCard,
			MescrollUni,
			uniSwipeAction,
			uniFab,
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				classes:[],
				courseId:0,
				courseName:'',
				studentCourseGroupservice:new StudentCourseGroupService(),
				CourseService:new CourseService(),
			}
		},
		methods: {
			getclasses(){
				this.studentCourseGroupservice.checkCourseClassList(this.courseId)
				.then((result)=>{//.then表示成功响应的回调函数，result是获取到的数据
					console.log("数据：",result.data);
							this.classes=result.data;	
				}).catch(err=>{//这里是获取数据报错的分支
					
				}).finally(()=>{//这里是无论成功失败都会进入的分值
					
				});
			},
			getCourseName(){
				this.CourseService.getCourseInfo(this.courseId)
				.then((result)=>{//.then表示成功响应的回调函数，result是获取到的数据
					console.log("数据：",result.data);
							this.courseName = result.data.courseName;
				}).catch(err=>{//这里是获取数据报错的分支
					
				}).finally(()=>{//这里是无论成功失败都会进入的分值
					
				});
			},
			classclick(cgid,cgname){
				uni.navigateTo({
									url: 'checkClassStudentList?id='+cgid+'&className='+cgname
								});
			}
			
		},
		onLoad(e) {
			
			var courseName = this.getCourseName();
			console.log(e.cId)
			console.log("课程名"+courseName);
			this.courseId = e.cId;
			console.log("*******************************课程id为："+this.courseId);
			this.getclasses();
			// if(courseId!=''){
			// this.courseId=courseId;
			// }else{
				
			// }
			
		}
	}
</script>

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
