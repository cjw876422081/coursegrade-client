<template>
	<!-- 教师查看单个授课内容作业 -->
	<view class="content">
		<view class="main">
			<view class="list" v-for="(homework, index) in homeworks" :key="index">
				<view @tap="gotohomework(homework.id)">
					<uni-swipe-action :options="options2" @click="deleteHomework">
						<view class="homework-list">
							<text class="homework-H">作业代码 : </text>
							<text class="homework-Data"> {{ homework.homeworkCode }}</text>
						</view>
						<view class="homework-list">
							<text class="homework-H">作业内容 :</text>
							<text class="homework-Data">{{ homework.homeworkMemo }}</text>
						</view>
						<view class="homework-list">
							<text class="homework-H">作业目标 :</text>
							<text class="homework-Data">{{ homework.homeworkTarget }}</text>
						</view>
						<view class="homework-list">
							<text class="homework-H">作业分值 :</text>
							<text class="homework-Data">{{ homework.homeworkGrade }}</text>
						</view>
						<view class="homework-list">
							<text class="homework-H">截止时间 :</text>
							<text class="homework-Data">{{ handleTime(homework.homeworkDeadline) }}</text>
						</view>
					</uni-swipe-action>
				</view>
			</view>
		
			<uni-fab horizontal="right" :content="fabButtonContent" @trigger="courseHomework(homeworks[0].plan.id)"></uni-fab>
		</view>
	</view>
	
</template>
<script>
import CourseHomeworkService from '../../common/service/CourseHomeworkService.js'; //引入CourseHomeworkService
import uniFab from '@/components/uni-fab/uni-fab.vue';

import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniSwipeAction,
		uniList,
		uniListItem,
		uniFab
	},
	data() {
		return {
			CourseHomeworkService: new CourseHomeworkService(),
			planId: '2',

			homeworks: [],

			/* 左滑删除作业 */
			options2: [
				{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}
			],

			/*布置作业 */
			fabButtonContent: [
				{
					iconPath: '/static/add-icon.png',
					selectedIconPath: '/static/add-icon.png',
					text: '布置作业',
					active: false
				}
			]
		};
	},
	onLoad: function(option) {
		uni.setNavigationBarTitle({
			title: '单个授课内容作业'
		});
		console.log(option.homeworkId);
		this.homework.id = option.homeworkId;
		this.getHomework();
	},
	onShow: function() {
		this.getHomework();
	},
	methods: {
		/* 获取作业列表 */
		getHomework: function() {
			var a = '2';
			console.log(a);
			// const planId = this.plan.id;
			this.CourseHomeworkService.getHomework(2)
				.then(result => {
					// this.getCourseInfo(courseId);
					console.log('啦啦啦', result.data);
					this.homeworks = result.data;
				})
				.catch(err => {})
				.finally(() => {});
		},
		
		/*日期格式化 */
		handleTime: function(date) {
			var d = new Date(date);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
			var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
			var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		},
		/* 删除作业 */
		deleteHomework(e) {
			console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text,e)
			if(e.content){
				const homerworkId=e.content.homerworkId;
				console.log('---------1---',homerworkId)
				this.CourseHomeworkService.deHomework(homerworkId).then((result)=>{
					this.deHomework(homerworkId);
				}).catch((err)=>{
					uni.showToast({
					    icon:'none',
					    title: err.data.title
					});
				}).finally(()=>{
					
				})
			}
			
		},
		/* 删除作业列表 */
		dehomework(homeworkId){
			for(let i=0;i<this.homeworks.length;i++){
				const homerwork=this.homeworks[i];
				if(homerwork.id===homerwork){
					console.log("delete homerworkId",homerworkId);
					this.homeworks.splice(i,1);
					break;
				}
			}
		},

		/* 布置作业 @trigger */
		courseHomework(homeworkPlanId,homeworkId) {
			uni.navigateTo({
				url: '../createHomework/createHomework?homeworkPlanId='+homeworkPlanId
			});
		}
	}
};
</script>

<style>
	.content{
		background: rgb(250, 250, 250);
	}
.main {
	width: 96%;
	margin: 0 auto;
}
.list {
	width: 98%;
	margin: 0 auto;
	margin-top: 2vh;
	border: 1px solid rgb(0, 122, 255);
	border-radius: 10px;
}
.homework-list {
	margin-left: 1vw;
	border-bottom: 1px solid rgb(238, 238, 238) ;
	
}
/* .homework-H{
	color: rgb(234, 241, 244);
} */
.homework-Data {
	color: rgb(130, 190, 255);
}
.circle-btn {
	position: absolute;
	bottom: 65px;
	right: 15px;
	position: fixed;
	width: 58px;
	height: 58px;
	border-radius: 50%;
	background-color: #de533a;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	box-shadow: 2px 5px 10px #aaa;
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
