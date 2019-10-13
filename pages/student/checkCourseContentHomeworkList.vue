<template>
<view>
<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
               <view v-for="(courseHomework,i) in courseHomeworks" :key="i">
               <uni-card
                	:title="courseHomework.homeworkCode"
                	:is-shadow="true"
                	thumbnail="../../static/img/homework.png"
                	:extra="grade+courseHomework.homeworkGrade"
                	:note="deadlineTime+courseHomework.homeworkDeadline">
               	<text>{{courseHomework.homeworkMemo}}</text>
				<button class="mini-btn" type = "primary" size = "mini" @tap="gotoIndex()">提交</button>
               	 </uni-card> 
                </view>
                </mescroll-uni> 
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
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	import CourseHomework from "../../common/model/CourseHomework.js"
	import CheckCourseContentHomeworkService from "../../common/service/CheckCourseContentHomeworkService.js";
	export default{
		components:{
			uniSegmentedControl,
			uniCard,
			MescrollUni,
			uniFab
			
		},
		data(){
			 return {
			            /* items: ['全部','已提交','未提交'],
			            current: 0, */
						// gotoIndex:"",
						courseHomeworks:[],
						coursePlanId:1,
						//页码
						pageIndex:0,
						//页长
						pageSize:10,
						checkCourseContentHomeworkService:new CheckCourseContentHomeworkService(),
						isEnd:false,
						totalElements:0,
						deadlineTime:"截止时间：",
						grade:"分值：",
						downOption:{
							use: true, // 是否启用下拉刷新; 默认true
							auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true 
						},
						upOption: {
						use: true, // 是否启用上拉加载; 默认true
						auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
						page: {
							num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
							size: 10 // 每页数据的数量,默认10
						},
						noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
						empty: {
							tip: '暂无相关数据'
						}
					}, 
						
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
			downCallback(mescroll){
				console.log("down",mescroll);
				this.pageIndex=0;
				this.getCoursehomeworks(()=>{
					mescroll.resetUpScroll();
				});
			},
			upperCallback(mescroll){
				console.log("upper",mescroll);
				this.pageIndex=mescroll.num;
				this.
				getCoursehomeworks(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
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
								url: '../courseHomework/getOneHomework'
							});
						},
						gotoIndex(){
							console.log("点击")
							uni.navigateTo({
								url: '../courseHomework/getOneHomework'
							});
						},
					},
		
					
			onLoad(){
					
					//	this.getCoursehomeworks();
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

