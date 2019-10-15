<template>
	<view class="main-content">
				<t-table border="2"  :is-check="false" >
					<t-tr font-size="20" color="black" align="center">
					    <t-th>{{ courseName }}课程开班信息</t-th>
					</t-tr>
				    <t-tr font-size="15" color="black" align="left">
				        <t-th align="left">班级</t-th>
				        <t-th align="left">人数</t-th>
						<t-th align="center">查看</t-th>
						<t-th align="center">加入</t-th>
				    </t-tr>
				    <view v-for="(courseGroup,i) in classes" :key="i" >
						<t-tr font-size="15" color="black" align="left" >
				        <t-td align="left" >{{courseGroup.groupName}}</t-td>
						<t-td align="left">{{courseGroup.groupCount}} </t-td>
						<t-td ><button  style="font-size: 3vw;" v-on:click="classclick(courseGroup.id,courseGroup.groupName)" size="mini" >查看学生</button></t-td>
						<t-td ><button  style="font-size: 3vw;"  size="mini" v-on:click="JointheClass(courseGroup.groupCode)" >立即加入</button></t-td>
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
				console.log("查看学生",cgid , cgname)
				uni.navigateTo({
									url: 'checkClassStudentList?id='+cgid+'&className='+cgname
								});
			},
			JointheClass(groupCode){
				this.studentCourseGroupservice.joinTheClass(groupCode) //调用courseService中的createCourse方法，将提取出的有效信息formData传给创建课程的接口
					.then(result => {
						//.then(返回值)方法可以保证上面的创建语句执行完后再执行下面的代码，避免了执行下面语句时还没有收到返回值的情况
						console.log('join the class', result); //控制台打印创建课程操作的返回值
						if (result.data) {
							//判断返回值中的data字段是否存在，如果存在则其中的id属性是否>0(如果创建成功，数据库会自动给id赋值)
							uni.showToast({
								//找到了正确的id值，弹窗显示"课程创建成功"
								icon: 'success',
								title: '加入班级成功'
							});
							setTimeout(() => {
								//等待1.5秒以确保判断完成，然后退出当前界面，返回上个界面
								console.log('settime out');
								uni.navigateBack();
							}, 1500);
						}
					})
					.catch(error => {
						//如果没有找到正确的id值，则执行的操作
					})
					.finally(() => {
						//这是无论有没有检测到正确的id值都要执行的语句
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
	#Join1{
		margin-bottom: 0vh;
		padding-bottom: 0vh;
		width: 20vw;
		font-size: 20;
		color: #000000;
	}
</style>
