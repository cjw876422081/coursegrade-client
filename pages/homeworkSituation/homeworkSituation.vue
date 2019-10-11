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
				<label>{{teacher}}</label>
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
						v-if="student.submitMemo&&student.grade"
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
							v-if="!student.grade && student.submitMemo"
							style="margin-bottom:10rpx;background: #f0ffff;"
							:title="student.student" 
							:extra="'得分:'+student.grade" >
							<label>作业内容:</label><br><br>
								<text>{{student.submitMemo}}</text><br><br>
								<label >提交时间:{{student.submitTime}}</label><br>
								<button type="primary" size="default" style="margin: 0 15vh 0 15vh;" @trigger="score">去评分</button>
							</uni-card>
				</view>
			</view>
			<view>
				<!--所有人都提交则不显示未提交-->
				<view v-if="flag">
					<view style="text-align: center;font-weight: bold;color: red;">
						<label>未提交</label>
					</view>
							<uni-list v-for="(student,i) in allStudentHomework" :key="i" 
									  v-if="!student.submitMemo">
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
				//作业ID------  
				homeworkId:5,
				//创建者
				teacher:'',
				//提交人数
				numberOfSubmissions:0,
				//总人数
				totalNumber:0,
				//所有学生作业
				allStudentHomework:[],
				//根据提交人数判断是否显示未提交
				flag:true,
				//是否显示未评分
				flagI:true,
				//是否显示已提交
				flagII:true,
				//页码
				pageIndex:0,
				//页长
				pageSize:10,
				isEnd:false,
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
			},
			upperCallback(mescroll){
				console.log("upper",mescroll);
				this.pageIndex=mescroll.num;
				this.getStudentHomework(()=>{
					mescroll.endSuccess(this.totalElements, !this.isEnd); 
				});
			},
			getStudentHomework(callback){
				this.studentHomework.getHomeworkSituation(
					this.homeworkId,
					{
					page:this.pageIndex,
					size:this.pageSize
					}
				).then((result) => {
					console.log("StudentHomeworkService getHomeworkSituation+++++++++",result);
					if(this.pageIndex==0){
						this.allStudentHomework=result.data.content;
						//计算提交人数
						let count = 0;
						for(let i=0;i<this.allStudentHomework.length;i++){
							
							if( this.allStudentHomework[i].submitMemo==null||
								this.allStudentHomework[i].submitMemo==""){	
							}else{
		
								count++;
							}
						}
						//计算提交并评分人数
						let count2 = 0;
						let flag0=true;
						let flag1=true;
						let flag2=true;
						if(count==0){//无人提交  只显示未提交
							flag1=false;
							flag2=false;
						
						}else if(count==result.data.totalElements){//提交人数等于总人数  则不显示未提交 对评分进行判断
							flag0=false;
							let num = 0;
							for(let i = 0;i<count;i++){
								if(this.allStudentHomework[i].grade!=0 && this.allStudentHomework[i].grade!=""){
									
									num++;
									console.log("==========================",num)
								}
								
							}
							if(num==count){//没有未评分的学生
								flag1=false;
							}
							 if(num==0){//只显示未评分
								flag2=false;
							}
							
						}
						else if(count!=result.data.totalElements){//判断评分和未评分
							for(let i = 0 ;i<result.data.totalElements;i++){
								if(this.allStudentHomework[i].submitMemo!=null||this.allStudentHomework[i].submitMemo!=""){
									if(this.allStudentHomework[i].grade!=0 && this.allStudentHomework[i].grade!=null){
										count2++;
										console.log("ppppppppppppppppppppp",count2)
									}else{
										
									}
								}
							}
							console.log("-----------ppppppppppppppppppppp",count2)
							console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",count)
							if(count2==0){//全部都是未评分
								flag2=false;
							}
							if(count==count2){//全部都是已提交并评分
								flag1=false;
							}
						}
						this.flag=flag0;//flag
						this.flagI=flag1;//flagI
						this.flagII=flag2;//flagII
						this.numberOfSubmissions=count;
					}else{
						this.allStudentHomework=this.allStudentHomework.concat(result.data.content);
						//计算提交人数
						let count = 0;
						for(let i=0;i<this.allStudentHomework.length;i++){
							
							if( this.allStudentHomework[i].submitMemo==null||
								this.allStudentHomework[i].submitMemo==""){	
							}else{
								
								count++;
							}
						}
						//计算提交并评分人数
						let count2 = 0;
						let flag0=true;
						let flag1=true;
						let flag2=true;
						if(count==0){//无人提交  只显示未提交
							flag1=false;
							flag2=false;
						
						}else if(count==result.data.totalElements){//提交人数等于总人数  则不显示未提交 对评分进行判断
							flag0=false;
							let num = 0;
							for(let i = 0;i<count;i++){
								if(this.allStudentHomework[i].grade!=0 && this.allStudentHomework[i].grade!=""){
									
									num++;
									console.log("==========================",num)
								}
								
							}
							if(num==count){//没有未评分的学生
								flag1=false;
							}
							 if(num==0){//只显示未评分
								flag2=false;
							}
							
						}
						else if(count!=result.data.totalElements){//判断评分和未评分
							for(let i = 0 ;i<result.data.totalElements;i++){
								if(this.allStudentHomework[i].submitMemo!=null||this.allStudentHomework[i].submitMemo!=""){
									if(this.allStudentHomework[i].grade!=0 && this.allStudentHomework[i].grade!=null){
										count2++;
										console.log("ppppppppppppppppppppp",count2)
									}else{
										
									}
								}
							}
							console.log("-----------ppppppppppppppppppppp",count2)
							console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",count)
							if(count2==0){//全部都是未评分
								flag2=false;
							}
							if(count==count2){//全部都是已提交并评分
								flag1=false;
							}
						}
						this.flag=flag0;
						this.flagI=flag1;
						this.flagII=flag2;
						this.numberOfSubmissions=count;
					}
					console.log("allStudentHomework===------------++-",result.data.content);
					//获取发布该作业的教师
					this.teacher=this.allStudentHomework[0].teacher;
					//获取总人数
					this.totalNumber=result.data.totalElements;
					
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
			score(e){
				console.log("score",e);
				uni.navigateTo({
					url: '../checkHomework/checkHomework'
				});
			}
		}
	}
</script>


