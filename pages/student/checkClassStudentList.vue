<template>
	<view class="main-content" v-if="courseGroupId">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback"  >
			<t-table class="tab" border="3" border-color="#eeeeee" :is-check="false" >
				<t-tr font-size="16" color="#00CCFF" align="center">
				    <t-th>{{courseGroupName}}班学生列表</t-th>
				</t-tr>
			    <t-tr class="title" font-size="15" color="#00CCFF" align="left" >
			        <t-th align="center">编号</t-th>
			        <t-th align="center">姓名</t-th>
			    </t-tr>
			    <t-tr font-size="15" color="#5d6f61" align="left" v-for="(student,i) in students" :key="i">
			        <t-td align="center">{{student.id}}</t-td>
			        <t-td align="center">{{student.student}}</t-td>
			    </t-tr>
				<t-tr><t-td align="center" style="height: 60vh;"></t-td></t-tr>
			</t-table>
			</mescroll-uni>
	</view>
	<view class="fail" @click="returnCourse()" v-else ><t-table style="margin-left: 16vw;" border="5" font-size='15' border-color="#cfd8dc"><t-tr><t-td>未获取到班级!点此回到主页</t-td></t-tr></t-table></view>
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
	.fail{
		font-size: 8vw;
		font-family: 楷体;
		color: #E2231A;
	}
	.tab{
		position: absolute;
		margin-left: 20vw;
		overflow: auto;
		width: 60vw;
	}
	
</style>


<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import CourseInfo from "../../common/model/StudentCourseGroup.js";
	import StudentCourseGroupService from "../../common/service/StudentCourseGroupService.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	export default {
		components:{
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
				//学生列表
				students:[],
				//页码
				pageIndex:0,
				//页长
				pageSize:10,
				courseGroupId:0,
				courseGroupName:'',
				studentCourseGroupservice:new StudentCourseGroupService(),
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
					noMoreSize: 10, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
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
					console.log("CourseService getTeacherCourses>",result)//调试：在控制台输出返回值
					console.log("数据：",result.data.content);
					
					if(this.pageIndex==0){//如果是获取的第一页数据，则覆盖courses数组
							this.students=result.data.content;
						}else{
							//如果是后续页码的数据，则不能覆盖，需要追加到courses数组中
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
			returnCourse(){
				uni.navigateTo({
					url:'checkCourseList'
				})
			}
			
			
		},
		onLoad(e) {
			var classId='';
			classId=e.id;
			if(classId!=''){
			this.courseGroupId=classId;
			this.courseGroupName=e.className;
			 console.log("班级为"+e.className)
			this.getStudents();
			}
			else{
				this.courseGroupId=false;
			}
		}
	}
	</script>