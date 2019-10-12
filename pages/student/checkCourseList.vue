<template> 
	<view class="main-content">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
		      <wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black bg-white" select-class="text-orange"></wuc-tab>
			  	<view v-for="(course,i) in courses" :key="i" style="margin-bottom:10rpx;" @click="courseClick(course)">
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
            tabList3: [{ name: '所有课程' }, { name: '我的课程' }],
			student:0,
            TabCur3: 0,

			studentCourses:[],
			allCourse:[],
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
        swiperChange3(e) {
            let { current } = e.target;
            this.TabCur3 = current;
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
				console.log("CourseService getTeacherCourses",result)
				if(result.data && result.data.content){
					result.data.content.forEach((item)=>{
						item.delOptions=[{
								text: '进入详情',
								style: {
								    backgroundColor: '#FF7b00'
								},
								courseId:item.id
							}]
					});
				console.log("CourseService getTeacherCourses",result);
				if(this.pageIndex==0){
					this.courses=result.data.content;
				}else{
					this.courses=this.courses.concat(result.data.content);
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
		getAllCourses(callback){
			this.courseService.getStudentCourses({
				page:this.pageIndex,
				size:this.pageSize
			}).then((result)=>{
				console.log("CourseService getTeacherCourses",result)
				if(result.data && result.data.content){
					result.data.content.forEach((item)=>{
						item.delOptions=[{
								text: '进入详情',
								style: {
								    backgroundColor: '#FF7b00'
								},
								courseId:item.id
							}]
					});
				console.log("CourseService getTeacherCourses",result);
				if(this.pageIndex==0){
					this.courses=result.data.content;
				}else{
					this.courses=this.courses.concat(result.data.content);
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
		checkCourse(course){
			
		}
	},

    onLoad() {
		
		}
	}
</script>

<style>
view,
scroll-view,
swiper {
    box-sizing: border-box;
}
view {
  font-size: 28upx;
  background-color: #f1f1f1;
}
.swiper {
    height: 140upx;
}

.cu-bar {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 100upx;
    justify-content: space-between;
}

.cu-bar .action {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    max-width: 100%;
  background-color: #ffffff;
}

.cu-bar .action:first-child {
    margin-left: 30upx;
    font-size: 30upx;
}

.solid,
.solid-bottom {
    position: relative;
}

.solid::after,
.solid-bottom::after{
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
}

.solid::after {
    border: 1upx solid rgba(0, 0, 0, 0.1);
}

.solid-bottom::after {
    border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
}

.text-orange{
  color:#f37b1d
}
.text-black{
  color:#333333;
}
.bg-white{
    background-color: #ffffff;
}

.padding {
    padding: 30upx;
}

.margin {
    margin: 30upx;
}

.margin-top {
    margin-top: 30upx;
}
.text-center {
    text-align: center;
}


.main-content{
		width:100vw;
		height:100vh;
		overflow: hidden;
	}
	.scroll-Y{
		height:100vh;
	}
</style>