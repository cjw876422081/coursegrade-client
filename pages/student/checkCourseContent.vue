<template>
	<view class="container">
		<view class="top">
			<view class="avatar-box"><image :src="course.courseCover" mode="scaleToFill" class="cover"></image></view>
	
		</view>
		   <wuc-tab :tab-list="tabList" textFlex :tabCur.sync="TabCur" tab-class="text-center text-black bg-white" select-class="text-orange"></wuc-tab>
		      <swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange" style="height:1000upx;">
		        <swiper-item>
					<text id="txt">
						课程名称 : {{course.courseName}}
						课程总数 : {{course.courseCount}}
						课程描述 : {{course.courseMemo}}
						课程周数 : {{course.courseWeekCount}}
						创建时间 : {{course.dataTime}}
					</text>
					<button  id="Join1" type="primary" v-bind:disabled="JoinBtn" plain="true" v-on:click="JointheClass()" >{{joincontent}}</button>
				</swiper-item>
				<swiper-item >
					<mix-tree
						:list="list"
					
					></mix-tree>
					<uni-fab
						horizontal="right"
						:content="fabButtonContent"
						@trigger="checkhomework"
					></uni-fab>
		        </swiper-item>
		     </swiper>
			 <!-- 	@treeItemClick="treeItemClick" -->
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import StudentCourseGroupService from '../../common/service/StudentCourseGroupService.js';
    import mixTree from '@/components/mix-tree/mix-tree2.vue';
	import CourseService from '../../common/service/CourseService.js';
	import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
	import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';

	export default {
		    data() {
		        return {
				  JoinBtn:false,
				  joincontent:"立即加入",
			      list :[],
				  course:{},
		          TabCur: 0,
				  courseId: 0,
				  StudentCourseGroupService: new StudentCourseGroupService(),
				  CourseService: new CourseService(),
		          tabList: [{ name: '课程简介' }, { name: '章节内容' }],
				  fabButtonContent:[
					
					],
		        }},
		    components: {
				WucTab ,
				mixTree,
				uniList,
				uniListItem
			},

		    methods: {
				getCourseInfo(){
					const courseId = this.courseId;
				
					this.StudentCourseGroupService
						.getCourseInfo(courseId)
						.then((result) => {
							// this.getCourseInfo(courseId);

							this.course = result.data;
						})
						.catch(err => {})
						.finally(() => {});
				},

				getCoursesPlan(){
					this.StudentCourseGroupService.
					getCoursePlanTree(this.courseId).
					then((result) => {
							console.log('StudentCourseGroupService getCoursePlanTree', result);
							if (result.data) {
								this.list = this.renderTreeList([result.data]);
								console.log('list', this.list);
							}
						})
						.catch(e => {})
						.finally(() => {});
				},

				//扁平化树结构
				renderTreeList(list=[], rank=0, parentId=[]){
					console.log( "parentId",parentId)
					let result=[];
					list.forEach(item=>{
						let treeNode={
							id: item.planMemo?item.id:999+item.id,
							name: item.planMemo?item.planMemo:item.courseName,
							parentId:parentId,  // 父级id数组
							rank:rank,  // 层级
							showChild: true,  //子级是否显示
							show: true  // 自身是否显示
						}
						if(Array.isArray(item.children) && item.children.length > 0){
							let parents = [...parentId];
							parents.push(treeNode.id);
							treeNode.children=this.renderTreeList(item.children, rank+1, parents);
						}
						result.push(treeNode);
					})
					return result;
				},
					
				checkhomework(){
					// uni.navigateTo({
					// 	url: '../student/checkCourseContentHomework?cId=' + this.courseId
					// });
				},
				

				IsJoinTheClass(){
					// this.StudentCourseGroupService.
					// IsJoinTheClass().then((result) =>{
					// 	console.log("result " ,result)
					// 	for(var i = 0,l=result.length ;i<l;i++){
					// 		if( result[i] == "id" && result[i][key] == this.course.id){
					// 				JoinBtn = false
					// 				return false;
					// 		}
					// 	}
					// 	 return true;
					// })
					// .catch(e=>{})
					// .finally(()=>{})
				},
				JointheClass(){
					uni.navigateTo({
					url: '../student/checkCourseClassList?cId=' + this.courseId
					});
				},
				// treeItemClick(item) {
				// 	let { id, planMemo, parentId } = item;
				// 	uni.showModal({
				// 		content: `点击了${parentId.length + 1}级菜单, ${planMemo.toString()}, id为${id}, 父id为${parentId.toString()}`
				// 	});
				// 	console.log(item);
				// },
				tabChange(index) {
				    this.TabCur = index;
				},
				swiperChange(e) {
							let { current } = e.target;
							this.TabCur = current;
				 }
		    },
			onLoad(option) {
				console.log("option" , option.cId)
				this.courseId = option.cId
				this.getCourseInfo();
				this.getCoursesPlan();
				
			},
			onShow() {
				this.IsJoinTheClass();
			}
    }
</script>

<style>

	.container{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.ImageId{
		width:100vw;
		height:25vh;
	}
	#Join1{
		margin-bottom: 0vh;
		padding-bottom: 0vh;
	
	}
	.cover {
		width: 100%;
	}
		
	.txt{
	font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif; 
	}
</style>
