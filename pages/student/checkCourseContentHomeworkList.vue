<template>
		<view class="main-content">
			<view class="segmented-control">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
				</view>
			<view class="content">
				<view v-show="current === 0">
					<!-- <mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" > -->
					<!-- <view v-for="(courseHomework,i) in courseHomeworks" :key="i" > -->
					<uni-card
					 	title="全部"
					 	:is-shadow="true"
					 	thumbnail="../../static/img/homework.png"
					 	extra="Dcloud 2019-05-20 12:32:19"
					 	note="Tips">
						<text>帮</text>
						 </uni-card> 
					<!-- </view> -->
					<!-- </mescroll-uni> -->
				</view>
				<view v-show="current === 1">
					<uni-card
					 	title="已提交"
					 	:is-shadow="true"
					 	thumbnail="../../static/img/homework.png"
					 	extra="Dcloud 2019-05-20 12:32:19"
					 	note="Tips">
						 </uni-card> 
				</view>
				<view v-show="current === 2">
					<uni-card
					 	title="未提交"
					 	:is-shadow="true"
					 	thumbnail="../../static/img/homework.png"
					 	extra="Dcloud 2019-05-20 12:32:19"
					 	note="Tips">
						<button class="mini-button" size="mini" type="warn" plain="true" >提交</button>
						 </uni-card> 
				</view>
				
			</view>
		</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import uniCard from "@/components/uni-card/uni-card";
	//import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import CourseHomework from "../../common/model/CourseHomework.js"
	import CheckCourseContentHomeworkService from "../../common/service/CheckCourseContentHomeworkService.js";
	export default{
		components:{
			uniSegmentedControl,
			uniCard
			//MescrollUni
			
		},
		data(){
			 return {
			            items: ['全部','已提交','未提交'],
			            current: 0,
						 courseHomeworks:[],
						pageIndex:0,
						pageSize:10,
						checkCourseContentHomeworkService:new CheckCourseContentHomeworkService(),
						isEnd:false,
						totalElements:0,
						downOption:{
							use: true, // 是否启用下拉刷新; 默认true
							auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true */
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
						this.getCourseHomeworks(()=>{
							mescroll.resetUpScroll();
						});
					},
			upperCallback(mescroll){
						console.log("upper",mescroll);
						this.pageIndex=mescroll.num;
						this.getCourseHomeworks(()=>{
							mescroll.endSuccess(this.totalElements, !this.isEnd); 
						});
					},
			getCoursehomeworks(callback){
						this.checkCourseContentHomeworkService.getCourseHomework({
							page:this.pageIndex,
							size:this.pageSize
						}).then((result)=>{
							//console.log("CourseService getTeacherCourses",result)
							if(result.data && result.data.content){
								result.data.content.forEach((item)=>{
	
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
			onLoad(){
						
					},
			courseClick(courseHomework){
						
					}
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
	    .mini-button{
			float: right;
		}
</style>

