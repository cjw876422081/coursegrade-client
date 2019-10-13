<template>
	<view class="main-content">
		
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upperCallback" >
			<uni-card>
				<view class="input-row">
					<img :src="studentHomework.submitMemo" @click="toEnlarge"
					alt="作业内容" style="width:13vw; height:8vh;" />
					<view class="submitInfo">
					<text>学生: {{studentHomework.student}}</text><br>
					<text>提交时间: {{studentHomework.submitTime}}</text>
					</view>
				</view>
				<view class="grade">
				<form @submit="formSubmit">
					<view class="input-row" >
						<view class="gradeItme input-row">
							<label>评分：</label>
							<input name="grade" :class="{'formerror':gradeError}" type="number" @blur="onBlur" ref="grade"/>
						</view>
						<button class="subBtn" form-type="submit">提交</button>
					</view>
				</form>
				</view>
			</uni-card>
			<view class="comment">
				<h4>评论</h4>
			<view class="commentItem" v-for="(note,i) in notes" :key="i" @click="noteClick(note)">
				<view class="uni-comment-list" :options="note.delOptions" @click="delClick" data-note="note">
					<view class="uni-comment-face">
						<image src="/static/logocolor.png" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>@{{note.publishUser}}</text>
						</view>
						<view class="uni-comment-content"><text>{{note.noteMemo}}</text></view>
					    <view class="uni-comment-date">
					    	<text>{{note.noteTime}}</text>
					    </view>
					</view>
				</view>
			</view> 
			</view>
		</mescroll-uni>
		<view class="mask" :class="{'enlarge':flag}" @click="exit">
			<img :src="studentHomework.submitMemo" alt="作业内容" 
			style="width:50vw;height:50wh;
			position:absolute" @click="exit"/>
		</view>
	</view> 
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card";
	import StudentHomework from "../../common/model/StudentHomework.js";
	import StudentHomeworkService from "../../common/service/StudentHomeworkService.js";
	import CourseNote from "../../common/model/CourseNote.js";
	import CourseNoteService from "../../common/service/CourseNoteService.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		components:{
			uniCard,
			MescrollUni
		},
		data() {
			return {
				flag:false,
				//学生提交作业的id，应从上页面获取
				studentHomeworkId:0,
				grade:0,
				studentHomework:[],
				studentHomeworkService:new StudentHomeworkService(),
			    //笔记列表
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
				
				gradeError:false,

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
			}
		},
		methods: {
			
			//加载列表数据
			loadData(e){
				this.getStudentHomework()
			},
			
			onBlur (event) {
			  let value = event.detail.value
			  if (!value) {
			    this.inputValue = 0
			    return
			  }
			  value = +value
			  if (value > 100) {
				this.$refs.grade.value = 100
				value=100
			  } else if (value < 0) {
				this.$refs.grade.value = 0
				value=0
			  }
			  this.grade=value
			},
			toEnlarge(e){
				this.flag=true;
			},
			exit(){
				this.flag=false;
			},
			formSubmit(e){
				var formdata=e.detail.value;
				console.log('form发生了submit事件，携带数据为：', formdata);
				const validResult=this.formValid(formdata);
				if(!validResult){
					uni.showToast({
					    icon:'none',
					    title: "输入数据不合法"
					});
					return;
				} 
				this.studentHomeworkService.updateStudentHomeworkGrade(
					this.studentHomeworkId,
					this.grade
				).then((result)=>{
					console.log("course formSubmit callback",result);
					if(result.data && result.data.id>0){
						uni.showToast({
						    icon:'success',
						    title: "作业批改完成"
						});
						/* setTimeout(()=>{
							console.log("settime out")
							uni.navigateBack();
						},1500); */
					}
				}).catch((error)=>{
					
				}).finally(()=>{
					
				}); 
			},
			formValid(formdata){
				this.gradeError=false;
				let result=true;
				if(formdata.grade==null || formdata.grade.length==0){
					this.gradeError=true;
					result= false;
				}
				return result;
			},
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
			onLoad(option){
				this.studentHomeworkId=option.studentId
				this.loadData()
			},
			getStudentHomework(){
				this.studentHomeworkService.getStudentHomework(
					this.studentHomeworkId
				).then((result)=>{
					if(result.data){
						this.studentHomework=result.data;
					}
				}).catch(err=>{
					
				}).finally(()=>{
					
				});
			}
		}
	}
</script>

<style>
.main-content{
		width:100vw;
		height:100vh;
		overflow: hidden;
	}
.mask.enlarge{
	background: rgba(10,10,10,0.6);
	left: 0;
	top: 0;
	width:100vw;
	height:100vh;
	position: absolute;
	z-index: 100;
	}
.submitInfo{
	margin:0 20rpx;
	color:rgba(80,90,100,0.8)
}
.grade{
	border-top: rgba(0,0,0,0.2) solid 2rpx;
	padding-top:2vh;
}
.input-row .gradeItme{
	margin-left:45vw;
}
.input-row label{
	padding:7rpx 5rpx;
	color:rgba(50,100,150,0.8);
	font-size: 23rpx;
}
.input-row input{
	width:17vw;
	height:47upx;
	border: 2rpx solid rgba(100,100,100,0.3);
	border-radius: 10rpx;
	color:rgba(100,100,100,0.8);
	text-align: center;
}
input.formerror{
	border: 2rpx solid rgba(250,0,0,0.3) !important;
}
.subBtn{
	width:15vw; 
	height:50upx;
	margin-right:0rpx;
	margin-top: 0vh;
	background: rgba(20,100,255,0.8);
	font-size: 23rpx;
	color:rgb(70,80,100)
}
.comment{
	background: rgba(50,50,50,0.8);
	margin:0 3vw;
}
.commentItem{
	border: 1rpx solid rgba(150,150,150,0.3);
}
.uni-comment-content{
	color:rgb(250,250,250)
}
.uni-comment-date{
	color:rgb(250,250,250);
	font-size: 20rpx;
}
.comment h4{
	text-align: center;
	color:rgb(250,250,250)
}
</style>
