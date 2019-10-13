<template>
	<view class="main-content">
		<uni-list>
		    <uni-list-item title="作业目标" :note="courseHomework.homeworkTarget" showArrow="false"></uni-list-item>
		    <uni-list-item title="作业内容" :note="courseHomework.homeworkMemo" showArrow="false"></uni-list-item>
			<uni-list-item title="作业分值" :note="courseHomework.homeworkGrade" showArrow="false"></uni-list-item>
			<uni-list-item title="创建时间" :note="courseHomework.dataTime" showArrow="false"></uni-list-item>
			<uni-list-item title="截止时间" :note="courseHomework.homeworkDeadline" showArrow="false"></uni-list-item>
		</uni-list>
		<form @submit="submitHomework">
			<textarea class="homeworkText" v-model="studentHomework.submitMemo" placeholder="在此输入作业文本内容...">
			</textarea>
			<view>
				<robby-image-upload v-model="imageData" :server-url="serverUrl" fileKeyName="file"></robby-image-upload>
			</view>
			<button class="submit" form-type="submit" type="default">提交</button>
		</form>	
	</view>
</template>

<style>
	.main-content{
		width:100vw;
		height:100vh;
		overflow: hidden;
	},
	.homeworkText{
		height: 15vh;
	}
	
</style>

<script>
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
	import CourseHomework from "../../common/model/CourseHomework.js";
	import CourseHomeworkService from "../../common/service/CourseHomeworkService.js";
	import uniList from "../../components/uni-list/uni-list.vue";
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue";
	import StudentHomeworkService from "../../common/service/StudentHomeworkService.js"
	import mInput from "../../components/m-input.vue";
	import StudentHomework from "../../common/model/StudentHomework.js";
	export default {
	    components: {uniList,uniListItem,robbyImageUpload},
		data() {
			return {
				homeworkId:3,
				studentHomework:new StudentHomework(),
				courseHomework:CourseHomework,
				courseHomeworService:new CourseHomeworkService(),
				studentHomeworkService:new StudentHomeworkService(),
				imageData:[],
				serverUrl:"/api/file/upload"
			}
		},
		methods: {
			onLoad(option){
				// 得到 homeworkId
				this.getOneHomework();
			},
			getOneHomework(){
				this.courseHomeworService.getOneHomework(this.homeworkId).then((result)=>{
					console.log("courseHomeWork:",result);
					if(result.data){
						this.courseHomework=result.data;
					}
				}).catch(err=>{
					
				}).finally(()=>{
					
				});
			},
			submitHomework(){
				// 作业截止时间（标准时间）转时间戳
				var deadLine =new Date(this.courseHomework.homeworkDeadline).getTime();				
				// 当前时间戳
				var now = (new Date().getTime());
				let data = this.studentHomework;
				data.homework={id:this.homeworkId};
				if(data.submitMemo==null || data.submitMemo==""){
					uni.showToast({
						icon:'none',
						title: '请输入文本内容!'
					});
				}else if(now > deadLine){
					uni.showToast({
						icon:"none",
						title: '已超时，不能提交'
					});
				}
				else {
					this.studentHomeworkService.submitHomework(data).then((result)=>{
						console.log("StudentHomeworkService submit homework",result);
						if(result.data && result.data.id>0){
							uni.showToast({
								icon:'success',
								title: '提交作业成功!'
							});
							setTimeout(()=> {
								console.log("settime out")
								uni.navigateBack();
							}, 1500);
						}
					}).catch((error=>{
						
					})).finally(()=>{
					})
				}
				
			}
			
			
			
		}
		
	}
</script>
