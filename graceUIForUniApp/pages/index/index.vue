<template>
	<view>
		<graceHeaderLineForApp></graceHeaderLineForApp>
		<graceHeader url="../gy/gy" :title="'GraceUI 组件 [ '+ lists.length +'个 ]' " desc="基于uni-app及微信小程序的优秀前端框架" openType="switchTab"></graceHeader>
		<view class="grace-list grace-common-mt">
			<navigator class="items" v-for="(item, index) in lists" :key="index" :url="'../'+item.path+'/'+item.path">
				<view class="icons">
					<image :src="staticUrl + item.img" mode="widthFix"></image>
				</view>
				<view class="title">{{item.title}}<text>{{item.desc}}</text></view>
				<view class="arrow-right"></view>
			</navigator>
			<view class="items" @tap="showLoading">
				<view class="icons">
					<image :src="loadingImg" mode="widthFix"></image>
				</view>
				<view class="title">全屏 Loading</view>
				<view class="arrow-right"></view>
			</view>
			<view class="items" @tap="showGuide">
				<view class="icons">
					<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/guide.png" mode="widthFix"></image>
				</view>
				<view class="title">浮层引导</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<graceFullLoading :graceFullLoading="graceFullLoading" logoUrl="../../static/imgs/logo.png"></graceFullLoading>
		<!-- 浮层引导 dom 区-->
		<view class="grace-mask-layer" v-if="GuideShow">
			<!-- 指引示例1 -->
			<view class="grace-guide1">
				<image :src="staticUrl+'yd-1.png'" mode="widthFix"></image>
			</view>
			<!-- 指引示例2 -->
			<view class="grace-guide2">
				<image :src="staticUrl+'yd-2.png'" mode="widthFix"></image>
			</view>
			<!-- 指引示例3 -->
			<view class="grace-guide-other">
				<image :src="staticUrl+'yd-other.png'" mode="widthFix"></image>
			</view>
			<!-- 关闭按钮 -->
			<view class="grace-guide-btn">
				<image :src="staticUrl+'yd-btn.png'" @tap="closeGuide" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>
<script>
import graceFullLoading from "../../graceUI/components/graceFullLoading.vue";
import graceHeaderLineForApp from "../../graceUI/components/graceHeaderLineForApp.vue";
var _self;
export default{
	data() {
		return {
			staticUrl : this.staticUrl,
			loadingImg : this.staticUrl + 'loading.png', 
			graceFullLoading : false,
			lists : [
				{ img: 'shange.png', title: '布局栅格', path: "rows", desc:"flex 基础布局"},
				{ img: 'scroll.png', title: '滚动区域', path: "scroll", desc: "" },
				{ img: 'moveview.png', title: '可移动区域', path: "moveview", desc: "" },
				{ img: 'text.png', title: '文本详情', path: "text", desc: "" },
				{ img: 'number.png', title: '徽章', path: "badge", desc: "" },
				{ img: 'boxes.png', title: '宫格布局', path: "boxes", desc: "" },
				{ img: 'list.png', title: '通用列表', path: "list", desc: "" },
				{ img: 'img.png', title: '图文列表', path: "imgitem", desc: "" },
				{ img: 'news.png', title: '新闻列表', path: "newslist", desc: "多种模式" },
				{ img: 'cardView.png', title: '卡片视图', path: "cardView", desc:"" },
				{ img: 'tab.png', title: '局部选项卡', path: "tab", desc: "" },
				{ img: 'tab2.png', title: '整页选项卡', path: "tabfullpage", desc: "" },
				{ img: 'speaker-icon.png', title: '滚动公告', path: "speaker", desc: "" },
				{ img: 'star.png', title: '星级组件', path: "star", desc: "" },
				{ img: 'accordion.png', title: '折叠面板', path: "accordion", desc: "" },
				{ img: 'button.png', title: '按钮', path: "button", desc: "" },
				{ img: 'loading.png', title: 'Loading', path: "loading", desc: "" },
				{ img: 'title.png', title: '标题、更多、换一批', path: "titleandmore", desc: "" },
				{ img: 'xbanner.png', title: '横向公告', path: "boxbanner", desc: "" },
				{ img: 'check.png', title: '可选标签', path: "selecttips", desc: "" },
				{ img: 'menu.png', title: '底部导航', path: "footer", desc: "" },
				{ img: 'progressbar.png', title: '进度条', path: "progressbar", desc: "圆环+原生" },
				{ img: 'form.png', title: '表单组件', path: "form", desc: "" },
				{ img: 'checker.png', title: '表单验证', path: "checker", desc: "" },
				{ img: 'numberbox.png', title: '数字输入框', path: "numberBox", desc: "" },
				{ img: 'banner-icon.png', title: '弹出层', path: "banner", desc: "" },
				{ img: 'icon.png', title: '内置图标', path: "icons", desc: "" },
				{ img: 'step.png', title: '步骤提示', path: "steps", desc: "" },
				{ img: 'countdown.png', title: '倒计时', path: "countdown", desc: "" },
				{ img: 'swiper.png', title: '轮播组件', path: "swiper", desc: "" },
				{ img: 'slidedo.png', title: '滑动操作', path: "slidedo", desc: "滑动删除、操作" },
				{ img: 'date.png', title: '日历及时间选择', path: "date", desc: "带有阴历" },
				{ img: 'slider.png', title: '区间滑块', path: "slider", desc: "更智能,易扩展" },
				{ img: 'richtext.png', title: '富文本', path: "richtext", desc: "" },
				{ img: 'rich-text.png', title: '富文本加强', path: "richtext-strong", desc: "" },
				{ img: 'alert.png', title: '动画提醒', path: "alert", desc: "" },
				{ img: 'popupmenu.png', title: '弹出式菜单', path: "popupmenu", desc: "" },
				{ img: 'popovermenu.png', title: '多功能菜单', path: "popovermenu", desc: "" },
				{ img: 'animate.png', title: '动画库', path: "animate", desc: "" },
				{ img: 'numberKeyboard.png', title: '数字键盘', path: "numberKeyboard", desc: "" }
			],
			GuideShow : false
		}
	},
	onLoad:function(){
		_self = this;
	},
	components:{
		graceFullLoading,
		graceHeaderLineForApp
	},
	methods:{
		showLoading : function(){
			this.graceFullLoading = true;
			setTimeout(function(){_self.graceFullLoading = false;}, 2000);
		},
		// 打开引导
		showGuide : function(){
			this.GuideShow = true;
		},
		// 关闭引导
		closeGuide : function(){
			this.GuideShow = false;
		}
	}
}
</script>
<style>
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/

/* 浮层引导 dom 区 */
.grace-mask-layer{width:100%; height:100%; background:rgba(0,0,0,0.8); position:fixed; z-index:9998; left:0; top:0;}
/* 引导1 指向 logo 故 top 为 12upx left 为 6upx */
.grace-guide1{width:380upx; position:absolute; z-index:9999; left:12upx; top:6upx;}
.grace-guide1 image{width:380upx;}
/* 引导2 指向右上角按钮 故 top 为 12upx right 为 0upx */
.grace-guide2{width:220upx; position:absolute; z-index:9999; right:50upx; top:0upx;}
.grace-guide2 image{width:220upx;}
/* 引导按钮 bottom为 100upx left 为 0upx */
.grace-guide-btn{width:750upx; position:absolute; z-index:9999; left:0upx; bottom:100upx;}
.grace-guide-btn image{width:750upx;}
/* 请根据项目需求自行设置 */
.grace-guide-other{width:750upx; position:absolute; z-index:9999; left:0upx; top:500upx;}
.grace-guide-other image{width:750upx;}
</style>