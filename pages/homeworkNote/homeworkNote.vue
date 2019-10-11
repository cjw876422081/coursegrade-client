<template>
	<view class="main-content">
		
		<view class="uni-padding-wrap">
		    <!-- 评论区 start -->
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
		     <view class="content">
				 <text style="text-align: center;">作业ID：{{homeworkId}}</text>
			 </view>
			 <view class="uni-comment">
				
				<view v-for="(note,i) in notes" :key="i" style="margin-bottom:10rpx;" @click="noteClick(note)">
				<uni-swipe-action :options="note.delOptions" @click="delClick" data-note="note">
				<view class="uni-comment-list">
		            <view class="uni-comment-face">
		                <image src="/static/logocolor.png" mode="widthFix"></image>
		            </view>
		            <view class="uni-comment-body">
		                <view class="uni-comment-top">
		                    <text>{{note.publishUser}}</text> 
		                </view>
		                <view class="uni-comment-date">
		                    <text>{{note.noteTime}}</text>
		                </view>
		                <view class="uni-comment-content">{{note.noteMemo}}</view>
						
						<view class="uni-comment-replay-btn" v-if="changeReplay(note.pid)">
							<text>回复:{{note.pid}}号笔记</text>
						</view>
		            </view>
		        </view>
				</uni-swipe-action>
				</view>
				
		    </view> 
			</mescroll-uni>
		</view>
		<!-- <uni-fab
			horizontal="right"
			:content="fabButtonContent"
			@trigger="addClick"
		></uni-fab> -->
	</view>
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
	
	page {
	    background-color: #f8f8f8;
	}
	
	.uni-padding-wrap {
	    padding: 30upx;
	} 
	
	view {
	    font-size: 28upx;
	}
	
	.uni-comment {
	    padding: 5rpx 0;
	    display: flex;
	    flex-grow: 1;
	    flex-direction: column;
	}
	
	.uni-comment-list {
	    flex-wrap: nowrap;
	    padding: 10rpx 0;
	    margin: 10rpx 0;
	    width: 100%;
	    display: flex;
	}
	
	.uni-comment-face {
	    width: 70upx;
	    height: 70upx;
	    border-radius: 100%;
	    margin-right: 20upx;
	    flex-shrink: 0;
	    overflow: hidden;
	}
	
	.uni-comment-face image {
	    width: 100%;
	    border-radius: 100%;
	}
	
	.uni-comment-body {
	    width: 100%;
	}
	
	.uni-comment-top {
	    line-height: 1.5em;
	    justify-content: space-between;
	}
	
	.uni-comment-top text {
	    color: #0A98D5;
	    font-size: 24upx;
	}
	
	.uni-comment-date {
	    line-height: 38upx;
	    flex-direction: row;
	    justify-content: space-between;
	    display: flex !important;
	    flex-grow: 1;
	}
	
	.uni-comment-date view {
	    color: #666666;
	    font-size: 24upx;
	    line-height: 38upx;
	}
	
	.uni-comment-content {
	    line-height: 1.6em;
	    font-size: 28upx;
	    padding: 8rpx 0;
	}
	
	.uni-comment-replay-btn {
	    background: #FFF;
	    font-size: 24upx;
	    line-height: 28upx;
	    padding: 5rpx 20upx;
	    border-radius: 30upx;
	    color: #333 !important;
	    margin: 0 10upx;
	}
	
</style>


<script>
	import uniCard from "@/components/uni-card/uni-card";
	import CourseNote from "../../common/model/CourseNote.js";
	import CourseNoteService from "../../common/service/CourseNoteService.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	//import uniFab from "@/components/uni-fab/uni-fab.vue"
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	
	export default {
		components:{
			uniCard,
			MescrollUni,
			uniSwipeAction,
			//uniFab
			mSearch
		},
		data() {
			return {
				//课程列表
				notes:[],
				//对应类型id
				homeworkId:2,
				//页码
				pageIndex:0,
				//页长
				pageSize:10,
				//排序顺序
				sortS:'asc',
				//作业类型
				type:'作业',
				
				showReplay:false,
				
				val0: '',

				courseNoteService:new CourseNoteService(),
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
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂未查询到数据'
					}
				},
				/* fabButtonContent: [
					{
						iconPath: '/static/add-icon.png',
						selectedIconPath: '/static/add-icon.png',
						text: '创建课程',
						active: false
					}
				] */
			}
		},
		methods: {
			downCallback(mescroll){
				console.log("down",mescroll);
				this.pageIndex=0;
				this.getNotes(()=>{
					mescroll.resetUpScroll();
				});
			},
			upperCallback(mescroll){
				console.log("upper",mescroll);
				this.pageIndex=mescroll.num;
				this.getNotes(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
			},
			getNotes(callback){
				this.courseNoteService.getHomeworkNotes(
					this.homeworkId,
					{
						page:this.pageIndex,
						size:this.pageSize,
					},
					this.type
				).then((result)=>{
					console.log("CourseNoteService getHomeworkNotes",result)
					if(result.data && result.data.content){
						result.data.content.forEach((item)=>{
							item.delOptions=[{
									text: '删除',
									style: {
									    backgroundColor: '#FF7b00'
									},
									noteId:item.id
								}]
						});
						console.log("deloptions add",result.data.content);
						
						if(this.pageIndex==0){
							this.notes=result.data.content;
							//console.log("deloptions add",this.notes);
						}else{
							this.notes=this.notes.concat(result.data.content);
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
			
			changeReplay(notePid){
				return !this.isNull(notePid);
			},
			isNull(obj){
				return obj===null;
			},
			
			noteClick(note){
				console.log("noteClick",note);
			},
			delClick(e){
				//course  note
				//Course
				console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text,e)
				if(e.content){
					const noteId=e.content.noteId;
					this.noteService.delNote(noteId).then((result)=>{
						this.deleteNote(noteId);
					}).catch((err)=>{
						uni.showToast({
						    icon:'none',
						    title: err.data.title
						});
					}).finally(()=>{
						
					})
				}
			},
			deleteNote(noteId){
				for(let i=0;i<this.notes.length;i++){
					const note=this.notes[i];
					if(note.id===noteId){
						console.log("delete noteid",noteId);
						this.notes.splice(i,1);
						break;
					}
				}
				
			},
			addClick(e){
				console.log("addClick",e);
				uni.navigateTo({
					url: '../createCourse/createCourse'
				});
			},
			/* search(e, val) {
			    console.log(e, val);
			    this['val'+val] = e;
			} */
		},
		onLoad() {
			
		}
	}
</script>