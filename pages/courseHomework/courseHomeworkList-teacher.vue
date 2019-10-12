<template>
	<view class="content" style="background-image: url('./static/img/04.jpg');
		background-repeat: no-repeat;
		background-size: cover;padding:0;">
		<view class="bgmask"></view>
		<view style="overflow: hidden;">
			<view class="title">
				<scroll-view class="tab-title " scroll-x="true" id="tab-title">
					<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'tab-current' : 'tabpage']"
					 :id="'tabTag-' + index" @tap="tabChange">
						<text>{{ tab.name }}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<swiper class="tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange">
			<swiper-item key="0">
				<view data-scindex="0">
					<view class="content1">
						<view class="wth" v-for="(homework, index) in homeworks" :key="index">
							<view class="word">{{homework.homeworkCode}}</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item key="1">
				<view data-scindex="1">
					<view class="content2">
					</view>
				</view>
			</swiper-item>
			<swiper-item key="2">
				<view data-scindex="2">
					<view class="content3">
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		

		<button class="btn"><text class="icon-text">+</text></button>
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
				homeworks: [],
				index: 0,
				HomeworksService: new HomeworksService(),
				content: '',
				//分类信息
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{ name: '全部活动', id: 'pwd1', loadingType: 0, page: 1 },
					{ name: '未完成的活动', id: 'pwd2', loadingType: 0, page: 1 },
					{ name: '已完成的活动', id: 'pwd3', loadingType: 0, page: 1 },
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
				this.HomeworksService.getHomeworks({

				}).then((result) => {
					console.log("HomeworkService getHomeworks", result.data)
					this.homeworks = result.data;
					console.log(this.homeworks);
				}).catch(err => {

				}).finally(() => {
					if (callback) {
						callback();
					}
				});
			},

		}
	}
</script>

<style>
	page {
		background-color: #efefef;
	}
	/* 导航栏整体设置 */
	.title {
		
		text-align: center;
		height: 40px;
		border-bottom: 3px solid #00FFFF;
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
		color: #EEEEEE;
	}
	/* 导航栏底部下划线设置 */
	.tab-current {
		border-bottom: 3px solid #2cc867 !important;
		color: #2cc867;
		height: 24px;
	}
	.tab-swiper-full {
		height: 658px;
	}
	.btn {
		/* 阴影效果，四个参数分别是：水平阴影位置、垂直阴影位置、阴影尺寸位置大小、阴影颜色 */
		box-shadow: 2px 5px 10px #aaa;
		width: 60px;
		height: 60px;
		/* margin: 10px; */
		border-radius: 50%;
		cursor: pointer;
		/* border: none; */
		position: fixed;
		bottom: 35px;
		right: 20px;
		background: linear-gradient(40deg, #ffd86f, #fc6262);
		color: #fff;
	}

	.wth {
		height: 40px;
		border: 1upx solid #E6F1FE;
		border-radius: 6%;
		padding-bottom: 19px;
	}
	.word{
		
	}
	.content1{
		color: #EEEEEE;
		margin-top: -30px;
	}
	.bgmask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
