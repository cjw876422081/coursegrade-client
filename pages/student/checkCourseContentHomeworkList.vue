<template>
<view>
               <view v-for="(courseHomework,i) in courseHomeworks" :key="i">
               <uni-card
                	:title="courseHomework.homeworkCode"
                	:is-shadow="true"
                	thumbnail="../../static/img/homework.png"
                	:extra="grade+courseHomework.homeworkGrade"
                	:note="deadlineTime+handleTime(courseHomework.homeworkDeadline)"> 
					
               	<text>{{courseHomework.homeworkMemo}}</text>
				<button class="mini-btn" type = "primary" size = "mini" @tap="gotoIndex()">提交</button>
               	 </uni-card> 
                </view>
				<uni-fab
					horizontal="right"
					:content="fabButtonContent"
					@trigger="addClick"
				></uni-fab>
            </view>
        </view>
    </view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import uniCard from "@/components/uni-card/uni-card";
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	import CourseHomework from "../../common/model/CourseHomework.js"
	import CheckCourseContentHomeworkService from "../../common/service/CheckCourseContentHomeworkService.js";
	export default{
		components:{
			uniSegmentedControl,
			uniCard,
			
			uniFab
			
		},
		data(){
			 return {
						courseHomeworks:[],
						coursePlanId:0,
						//页码
						pageIndex:0,
						//页长
						pageSize:10,
						checkCourseContentHomeworkService:new CheckCourseContentHomeworkService(),
						/* isEnd:false,
						totalElements:0,*/
						deadlineTime:"截止时间：",
						grade:"分值：",
			        fabButtonContent: [
			        	{
			        		iconPath: '/static/img/submittedHomework.png',
			        		selectedIconPath: '/static/img/submittedHomework.png',
			        		text: '已提交',
			        		active: false
			        	}
			        ]
		}
		},
		methods:{
			 onClickItem(index) {
			            if (this.current !== index) {
			             this.current = index;
			     }
		},
			handleTime: function(date) {
				var d = new Date(date);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
				var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
				var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			},
			getCoursehomeworks(callback){
				this.checkCourseContentHomeworkService.getCourseHomework(this.coursePlanId,{
				page:this.pageIndex,
				size:this.pageSize
						}).then((result)=>{
				console.log("CourseService getTeacherCourses",result)
				if(result.data){
				console.log("deloptions add",result.data);
				if(this.pageIndex==0){
							this.courseHomeworks=result.data;
							}else{
							this.courseHomeworks=this.courseHomeworks.concat(result.data);
							}
				console.log("------------------");
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
			addClick(e){
				console.log("addClick",e);
				uni.navigateTo({
				url: '../courseHomework/submittedHomework'
					});
						},
					gotoIndex(){
							console.log("点击")
							uni.navigateTo({
								url: '../courseHomework/submittedHomework'
							});
						},
					},
			onLoad(e){
					this.coursePlanId = e.id ; 
					this.getCoursehomeworks();
					},
			courseClick(courseHomework){
						
					}
		}

</script>

<style>
	page {
			display: flex; 
			flex-direction: column;
			box-sizing: border-box;
			background-color: #efeff4
		}
		.main-content{
			width:100vw;
			height:100vh;
			overflow: hidden;
		}
		.segmented-control{
			height: 5vh;
			weight: 30vw;
		}
	    .mini-btn{
			float: right;
		}
</style>

