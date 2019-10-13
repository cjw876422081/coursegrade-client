<template> 
	<view class="main-content">
		<scroll-view class="grace-tab-title" :scroll-x="true" :scroll-into-view="titleShowId">
		  	<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-' + index" @tap="tabChange" :key="index">
		  		{{ tab.name }}
		  	</view>
		</scroll-view>
		<swiper class="grace-tab-swiper" :current="swiperCurrentIndex" @change="swiperChange">
			  <swiper-item>
				  <mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback">
					<view v-for="(course,i) in allCourses" :key="i" style="margin-bottom:10rpx;" @click="courseClick(course.id)">
						<uni-swipe-action :options="course.delOptions" @click="courseGroupClick(course.id)" data-course="course">
			  				<uni-card
			  				:title="course.courseName" 
			  				thumbnail="/static/logocolor.png" 
			  				:extra="course.courseCode" >
			  					<text>{{course.courseMemo}}</text>
			  				</uni-card>
							</uni-swipe-action>
					</view>
				</mescroll-uni>
			</swiper-item>
			
			<swiper-item>
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
					<view v-for="(course,i) in studentCourses" :key="i" style="margin-bottom:10rpx;" @click="courseClick(course.id)">
						<uni-swipe-action :options="course.delOptions" @click="courseGroupClick(course.id)" data-course="course">
			  				<uni-card
			  				:title="course.courseName" 
			  				thumbnail="/static/logocolor.png" 
			  				:extra="course.courseCode" >
			  					<text>{{course.courseMemo}}</text>
			  				</uni-card>
							</uni-swipe-action>
					</view>
				</mescroll-uni>
			</swiper-item>
		</swiper>
  </view>
</template>

<script>
import uniCard from "@/components/uni-card/uni-card";
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import CourseInfo from "../../common/model/CourseInfo.js";
import CourseService from "../../common/service/CourseService.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
import uniFab from "@/components/uni-fab/uni-fab.vue"

export default {
    data() {
        return {
            tabs: [
            	{
            		name: '所有课程',
            		id: 'guanye'
            	},
            	{
            		name: '我的课程',
            		id: 'dongtai'
            	}
            ],

            tabCurrentIndex: 0,
            swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			

			studentCourses:[],
			allCourses:[],
			pageIndex: 0,
			pageSize: 10,
			courseService: new CourseService(),
			isEnd:false,
			totalElements:0,
			
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
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
        };
    },

    components: { 
		WucTab,
		uniCard,
		MescrollUni,
		uniSwipeAction,
		uniFab
		},

    computed: {},

    methods: {
        tabChange: function(e) {
        	var index = e.target.id.replace('tabTag-', '');
        	this.swiperCurrentIndex = index;
        	this.tabCurrentIndex = index;
        	this.titleShowId = 'tabTag-' + index;
        },
		swiperChange: function(e) {
			var index = e.detail.current;
			this.tabCurrentIndex = index;
			this.titleShowId = 'tabTag-' + index;
		},
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
			this.courseService.getStudentCourses({
				page:this.pageIndex,
				size:this.pageSize
			}).then((result)=>{
				console.log("CourseService getAllCourses",result)
				if(result.data && result.data.content){
				console.log("CourseService getStudentCourses",result);
				if(this.pageIndex==0){
					this.studentCourses=result.data.content;
				}else{
					this.studentCourses=this.studentCourses.concat(result.data.content);
				}
				this.isEnd=result.data.last;
				this.pageIndex=result.data.number;
				this.pageSize=result.data.numberOfElements;
				this.totalElements=result.data.totalElements;
				}
			}).catch(err=>{
				
			}).finally(()=>{
				if(callback){
					callback();
				}
			});
			
			this.courseService.getAllCourses({
				page:this.pageIndex,
				size:this.pageSize
			}).then((result)=>{
				console.log("CourseService getAllCourses",result)
				if(result.data && result.data.content){
				console.log("CourseService getTeacherCourses",result);
				if(this.pageIndex==0){
					this.allCourses=result.data.content;
				}else{
					this.allCourses=this.allCourses.concat(result.data.content);
				}
				this.isEnd=result.data.last;
				this.pageIndex=result.data.number;
				this.pageSize=result.data.numberOfElements;
				this.totalElements=result.data.totalElements;
				}
			}).catch(err=>{
				
			}).finally(()=>{
				if(callback){
					callback();
				}
			});
		},
		
		courseClick(cId){
			/* console.log("courseClick",course); */
			uni.navigateTo({
								url: '../student/checkCourseContent?cId=' + cId
							});
		},
	},

    onLoad() {
		
		}
	}
</script>

<style>
	.main-content{
		width: 100%;
	}
	
	.grace-tab-swiper{
		margin-top: -100upx;
		height: 1550upx;
	}
</style>