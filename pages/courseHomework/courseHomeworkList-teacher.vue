<template>
	<view class="content">
		<!-- class="content" style="background-image: url('./static/img/04.jpg');
		background-repeat: no-repeat;
		background-size: cover;padding:0;"> -->
		<!-- <view class="bgmask"></view> -->
		<view style="overflow: hidden;">
			<view class="title">
				<scroll-view class="tab-title " scroll-x="true" id="tab-title" >
					<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'tab-current' : 'tabpage']"
					 :id="'tabTag-' + index" @tap="tabChange">
						<text>{{ tab.name }}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<swiper class="tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange">
			<swiper-item key="0">
				<scroll-view style="height: 100%;" :scroll-y="true">
					<view data-scindex="0">
						<view class="content1">
							<view class="wth" v-for="(homework, index) in homeworks" :key="index">
								<view class="left">
									<image class="pic" src="../../static/img/zuoye.png"></image>
								</view>
								<view class="right">
									<view class="word">{{homework.homeworkCode}}</view>
									<view>{{homework.dataTime}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item key="1">
				<scroll-view style="height: 100%;" :scroll-y="true">
				<view data-scindex="1">
					<view class="content2">
						<view class="wth" v-for="(homework, index) in noList" :key="index">
							<view class="left">
								<image class="pic" src="../../static/img/zuoye.png"></image>
							</view>
							<view class="right">
								<view class="word">{{homework.homeworkCode}}</view>
								<view>{{homework.dataTime}}</view>
							</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</swiper-item>
			<swiper-item key="2">
				<scroll-view style="height: 100%;" :scroll-y="true">
				<view data-scindex="2">
					<view class="content3">
						<view class="wth" v-for="(homework, index) in yesList" :key="index">
							<view class="left">
								<image class="pic" src="../../static/img/zuoye.png"></image>
							</view>
							<view class="right">
								<view class="word">{{homework.homeworkCode}}</view>
								<view>{{homework.dataTime}}</view>
							</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import HomeworksService from "../../common/service/AllHomeworks.js";
	export default {
		components: {
			sunTab
		},
		data() {
			return {
				yesList:[],
				noList:[],
				homeworks: [],
				index: 0,
				HomeworksService: new HomeworksService(),
				content: '',
				//分类信息
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '全部活动',
						id: 'pwd1',
						loadingType: 0,
						page: 1
					},
					{
						name: '未结束的活动',
						id: 'pwd2',
						loadingType: 0,
						page: 1
					},
					{
						name: '已结束的活动',
						id: 'pwd3',
						loadingType: 0,
						page: 1
					},
				],
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
			}
		},
		onLoad: function() {},
		onShow: function() {
			this.getHomeworks();
		},
		methods: {
			tabChange(e) {
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
			getHomeworks: function(callback) {
				this.HomeworksService.getHomeworks({}).then((result) => {
					console.log("HomeworkService getHomeworks", result.data)
					this.homeworks = result.data;
					console.log(this.homeworks);
					for (var i = 0; i < this.homeworks.length; i++) {
						this.homeworks[i].dataTime = this.handleTime(this.homeworks[i].dataTime);
					}
					this.getTime('2019-10-12 13:45:00',this.homeworks)
				}).catch(err => {

				}).finally(() => {
					if (callback) {
						callback();
					}
				});
			},
			gotocreatHomework: function() {
				uni.navigateTo({
					url: '../createHomework/createHomework'
				});
			},
			getTime: function(b,list) {
				var noList = []
				var yesList = []
				for(let i=0;i<list.length;i++) {
				    var getDate = new Date(list[i].dataTime.replace(/-/g,"/")).getTime()
				    var endDate = new Date(b).getTime()
				    var remain = endDate - getDate;
				    if(remain > 0) {
				    	yesList.push(list[i])
				    }else {
				    	noList.push(list[i])
				    }	
				}
				this.yesList = yesList
				this.noList = noList
			},
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

		}
	}
</script>

<style>
	.content {
		background-color: #0FAEFF;
	}

	/* 导航栏整体设置 */
	.title {
		text-align: center;
		height: 40px;
		border-bottom: 3px solid #00FFFF;
		position: fixed;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		z-index: 99999;
		background-color: #0FAEFF ;
		margin-top: -19.5upx;
	}

	/* 导航栏文字梳理 */
	.tab-title view {
		width: 33.3%;
		margin: 0 auto;
		display: inline-block;
		align-items: center;
		text-align: center;
		font-size: 15px;
		justify-content: space-between;
		padding-bottom: 13px;
		color: #000000;
		margin-left: -15px;
	}

	/* 导航栏底部下划线设置 */
	.tab-current {
		border-bottom: 3px solid #2cc867 !important;
		color: #2cc867;
		height: 24px;
	}

	.tab-swiper-full {
		height: 100vh;
		margin-top: 50px;
	}
	.wth {
		background: #EEEEEE;
		height: 40px;
		border: 1upx solid #E6F1FE !important;
		border-radius: 2%;
		padding-bottom: 19px;
		padding-left: 10px;
		margin-top: 10px;
		display: flex;
		justify-content: flex-start;
	}

	.right {
		margin-left: 10px;
	}

	.content1 {
		color: #000000;
		/* margin-top: -62px; */
	}

	/* .bgmask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
	} */
	.pic {
		width: 30px;
		height: 40px;
		margin-top: 10px;
	}
</style>
