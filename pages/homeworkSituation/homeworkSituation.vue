<template>
	<view class="main-content">
		<mescroll-uni 
			:down="downOption" 
			@down="downCallback" 
			:up="upOption" 
			@up="upperCallback" >
			<view class="content-head">
			<view class="classInfo">
				<label class="homeworkId">作业ID:{{homeworkId}}</label>
				<label></label>
				</view>
				<hr style="margin-right: 5vh;">
			<view class="count">
				<label class="countNum" style="color: #007AFF;">提交人数/总人数</label>
				<label>{{numberOfSubmissions}}/</label><label>{{totalNumber}}</label>
			</view>
			<hr style="margin-right: 5vh;">
			</view>
			<view class="studenthomework" v-if="flagII">
				<view class="alreadySubmit" style="text-align: center;font-weight: bold;color: #09BB07;"><label style="">已提交</label></view>
				
				<!--根据学生提交的作业内容和得分判断是否提交作业和评分-->
						<uni-card
						v-for="(student,i) in allStudentHomework" :key="i" 
						v-show="student.grade"
						style="margin-bottom:10rpx;background: #f0ffff;"
						:title="student.student" 
						:extra="'得分:'+student.grade" >
						<label>作业内容:</label><br><br>
							<text style="word-wrap: break-word;word-break: break-all;">{{student.submitMemo}}</text><br><br>
							<label >提交时间:{{student.submitTime}}</label><br>
							<label >查阅时间:{{student.readTime}}</label>
						</uni-card>
			</view>
			<view>		
			<!-- 如果所有人都已评分则不显示未评分-->
				<view  v-if="flagI">
					<view style="text-align: center;font-weight: bold;color: #007AFF;">
						<label>未评分</label>
					</view>
							<uni-card
							v-for="(student,i) in allStudentHomework" :key="i" 
							style="margin-bottom:10rpx;background: #f0ffff;"
							v-show="!student.grade"
							:title="student.student" 
							:extra="'得分:'+student.grade" >
							<label>作业内容:</label><br><br>
								<text style="word-wrap: break-word;word-break: break-all;">{{student.submitMemo}}</text><br><br>
								<label >提交时间:{{student.submitTime}}</label><br>
								<label>{{student.id}}</label><br><br>
								<button type="primary" size="default" style="margin: 0 15vh 0 15vh;" @click="score(student.id)">去评分</button>
							</uni-card>
				</view>
			</view>
			<view>
				<!--所有人都提交则不显示未提交-->
				<view v-if="flag">
					<view style="text-align: center;font-weight: bold;color: red;">
						<label>未提交</label>
					</view>
							<uni-list v-for="(student,i) in notSubmitStudent" :key="i" >
							    <uni-list-item :title="student.student" 
												show-arrow="false"
												show-extra-icon="true"
												></uni-list-item>
							</uni-list>
				</view>
			</view>
		</mescroll-uni>
		<view>
			
		</view>
	</view>
</template>
<style>
	.main-content{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: block;
		background:#add8e6;
	}
	.content-head{
		width: 100vw;
		margin-left: 3vh;
		margin-top: 3vh;
		font-weight: bold;
		display: block;
	}
	.classInfo{
		display: block;
	}
	.homeworkId{
		margin-right: 28vh;
	}
	.count{
		display: inline;
	}
	.countNum{
		margin-right: 21vh;
	}

</style>

<script>
	import StudentHomework from '../../common/model/StudentHomework.js';
	import StudentHomeworkService from '../../common/service/StudentHomeworkService.js';
	import StudentCourseGroupService from '../../common/service/StudentCourseGroupService.js'; 
	import StudentCourseGroup from '../../common/model/StudentCourseGroup.js'
	import uniCard from '@/components/uni-card/uni-card'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniList from '@/components/uni-list/uni-list'
	import uniListItem from '@/components/uni-list-item/uni-list-item'
	
	export default{
		components:{
			MescrollUni,
			uniCard,
			uniList,
			uniListItem
		},
		data(){
			return{
				//作业ID---
				homeworkId:3,
				//提交人数
				numberOfSubmissions:0,
				//总人数
				totalNumber:0,
				//所有学生
				allStudents:[],
				//所有学生作业
				allStudentHomework:[],
				//未提交学生名单
				notSubmitStudent:[],
				//根据提交人数判断是否显示未提交
				flag:true,
				//是否显示未评分
				flagI:true,
				//是否显示已提交
				flagII:true,
				//页码
				pageIndex:0,
				//页长
				pageSize:1000,
				isEnd:false,
				totalElements:0,
				temp:0,
				studentCourseGroup:new StudentCourseGroupService(),
				studentHomework:new StudentHomeworkService(),
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
						tip: '未查询到数据'
					}
				},
			}
		},
		methods:{
			downCallback(mescroll){
				console.log("down---------------",mescroll);
				this.pageIndex=0;
				this.getStudentHomework(()=>{
					mescroll.resetUpScroll();
				});
				this.getNotSubmitName(()=>{
					mescroll.resetUpScroll();
				});
			},
			upperCallback(mescroll){
				console.log("upper",mescroll);
				this.pageIndex=mescroll.num;
				
				this.getStudentHomework(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
				this.getNotSubmitName(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
			},
			getNotSubmitName(callback){
				this.studentCourseGroup.getStudentName(
				{
					page:this.pageIndex,
					size:this.pageSize
				}
				).then((result)=>{
					console.log("zzzzzzzzzzzzzzzzzzzzzzzResult",result)
						if(this.pageIndex==0){		
							this.allStudents=result.data.content;	
							this.totalNumber=result.data.totalElements;
							if(this.allStudentHomework.length==0){
								this.flagI=false;
								this.flagII=false;
								this.notSubmitStudent=this.allStudents
							}else if(this.allStudentHomework.length==result.data.totalElements){//提交人数等于学生总数 则没有未提交学生
								this.flag=false;
								let count=0;
								//判断提交学生中未评分的学生
								for(let i=0;i<this.allStudentHomework.length;i++){									
									if(this.allStudentHomework[i].grade!=null&&this.allStudentHomework[i].grade!=0){
										count++;
									}
								}
								//如果长度等于提交人数 则没有未评分的学生
								if(count==this.allStudentHomework.length){
									this.flagI=false;
								}
								//如果等于0则全部都是未评分的学生
								else if(count==0){
									this.flagII=false;
								}
							}else{
								
								let students=[];
								//判断未提交学生名单
								for(let i=0; i < result.data.totalElements; i++){
									let count = 0;
									for(let j=0; j < this.allStudentHomework.length; j++){
										if(this.allStudents[i].student!=this.allStudentHomework[j].student){
											count++;
										}
									}
									//如果长度等于提交学生名单   则该学生未提交作业
									if(count==this.allStudentHomework.length){
										students.push(this.allStudents[i])
									}
								}
								this.notSubmitStudent=students;
								let count2=0;
								//判断提交学生中未评分的学生
								for(let i=0;i<this.allStudentHomework.length;i++){									
									if(this.allStudentHomework[i].grade!=null&&this.allStudentHomework[i].grade!=0){
										count2++;
									}
								}
								//如果长度等于提交人数 则没有未提交
								if(count2==this.allStudentHomework.length){
									this.flagI=false;
								}
								//如果等于0则全部都是未评分的学生
								if(count2==0){
									this.flagII=false;
								}
							}
							this.isEnd=result.data.last;
							this.pageIndex=result.data.number;
							this.totalElements=result.data.totalElements;
						}else{
							this.allStudents=this.allStudents.concat(result.data.content);
							this.totalNumber=result.data.totalElements;
							if(this.allStudentHomework.length==0){
								this.flagI=false;
								this.flagII=false;
								this.notSubmitStudent=this.allStudents
							}else if(this.allStudentHomework.length==result.data.totalElements){//提交人数等于学生总数 则没有未提交学生
								this.flag=false;
								let count=0;
								//判断提交学生中未评分的学生
								for(let i=0;i<this.allStudentHomework.length;i++){									
									if(this.allStudentHomework[i].grade!=null&&this.allStudentHomework[i].grade!=0){
										count++;
									}
								}
								//如果长度等于提交人数 则没有未提交
								if(count==this.allStudentHomework.length){
									this.flagI=false;
								}
								//如果等于0则全部都是未评分的学生
								if(count==0){
									this.flagII=false;
								}
								
							}else if(this.allStudentHomework.length!=0&&this.allStudentHomework.length!=this.allStudents.length){
								let students=[];
								//判断未提交学生名单
								for(let i=0; i < result.data.totalElements; i++){
									let count = 0;
									for(let j=0; j < this.allStudentHomework.length; j++){
										if(this.allStudents[i].student!=this.allStudentHomework[j].student){
											count++;
										}
									}
									//如果长度等于提交学生名单   则该学生未提交作业
									
									if(count==this.allStudentHomework.length){
										students.push(this.allStudents[i])
									}
									//console.log("未提交学生名单222222222222",this.notSubmitStudent)
								}
								this.notSubmitStudent=students;
								let count2=0;
								//判断提交学生中未评分的学生
								for(let i=0;i<this.allStudentHomework.length;i++){									
									if(this.allStudentHomework[i].grade!=null&&this.allStudentHomework[i].grade!=0){
										count2++;
									}
								}
								//如果长度等于提交人数 则没有未提交
								if(count2==this.allStudentHomework.length){
									this.flagI=false;
								}
								//如果等于0则全部都是未评分的学生
								if(count2==0){
									this.flagII=false;
								}
							}	
							this.isEnd=result.data.last;
							this.pageIndex=result.data.number;
							this.totalElements=result.data.totalElements;
						}	
				}).catch(err=>{
				
			}).finally(()=>{
				if(callback){
					callback();
				}
			})
			},
			
			getStudentHomework(callback){
				this.studentHomework.getHomeworkSituation(
					this.homeworkId,
					{
					page:this.pageIndex,
					size:this.pageSize
					}
				).then((result) => {
					console.log("StudentHomeworkService getHomeworkSituation+++++++++",result.data.content);
						if(this.pageIndex==0){
							this.allStudentHomework=result.data.content;
						}else{
							this.allStudentHomework=this.allStudentHomework.concat(result.data.content);
							}
						this.numberOfSubmissions=result.data.totalElements;
						
						
						this.isEnd=result.data.last;
						this.pageIndex=result.data.number;
						this.totalElements=result.data.totalElements;
				}).catch(err=>{
					
				}).finally(()=>{
					if(callback){
						callback();	
					}
				})
				},
				
			score(studentId){
				uni.navigateTo({
					url: '../checkHomework/checkHomework?studentId='+studentId+"&homeworkId="+this.homeworkId
				});
			},
			onLoad(option){
				this.homeworkId=option.homeworkId;
			}
			/* onLoad(){
				this.loadData()
			} */
		}
	}
</script>


