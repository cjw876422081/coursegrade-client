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
			<textarea class="homeworkText" name="homeworkMemo" placeholder="在此输入作业文本内容...">
			</textarea>
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
		height: 20vh;
	}
	
</style>

<script>
	import CourseHomework from "../../common/model/CourseHomework.js";
	import CourseHomeworkService from "../../common/service/CourseHomeworkService.js";
	import uniList from "../../components/uni-list/uni-list.vue";
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue";
	import StudentHomeworkService from "../../common/service/StudentHomeworkService.js"
	import mInput from "../../components/m-input.vue";
	import StudentHomework from "../../common/model/StudentHomework.js";
	export default {
	    components: {uniList,uniListItem},
		data() {
			return {
				id:3,
				studentHomework:new StudentHomework,
				courseHomework:new CourseHomework,
				courseHomeworService:new CourseHomeworkService(),
				studentHomeworkService:new StudentHomeworkService()
			}
		},
		methods: {
			onLoad(){
				// 从作业列表点击进来
				this.getOneHomework();
			},
			getOneHomework(){
				this.courseHomeworService.getOneHomework(this.id).then((result)=>{
					console.log("HomeWork:",result);
					if(result.data){
						this.courseHomework=result.data;
					}
				}).catch(err=>{
					
				}).finally(()=>{
					
				});
			},
			submitHomework(e){
				const formData = e.detail.value;
				this.studentHomework.setHomework(this.id);
				this.studentHomework.setSubmitMemo(formData.homeworkMemo);
				const data = this.studentHomework;
				console.log("data",data);
				if(this.studentHomework.homework!=null){
					this.studentHomeworkService.submitHomework(data).then((result)=>{
						console.log("StudentHomeworkService submit homework",result);
						uni.showToast({
							title: '提交成功'
						});
						setTimeout(()=>{
							console.log("settime out")
							uni.navigateBack();
						},1500);
					}).catch((error=>{
						
					})).finally(()=>{
					})
				}
				
			}
			
			
			
		}
		
	}
</script>
