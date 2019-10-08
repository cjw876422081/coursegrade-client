<template>
	<view>
		<graceHeaderLineForApp></graceHeaderLineForApp>
		<graceHeader url="../gy/gy" :title="'GraceUI 界面库 [ '+ lists.length +'个 ]' " desc="漂亮、简洁、实用 ^_^" openType="switchTab"></graceHeader>
		<view class="grace-list grace-common-mt">
			<navigator class="items" v-for="(item, index) in lists" :key="index" :url="'../'+item.path+'/'+item.path">
				<view class="icons">
					<image :src="staticUrl + item.img" mode="widthFix"></image>
				</view>
				<view class="title">{{item.title}}<text>{{item.desc}}</text></view>
				<view class="arrow-right"></view>
			</navigator>
		</view>
	</view>
</template>
<script>
var _self;
import graceHeaderLineForApp from "../../graceUI/components/graceHeaderLineForApp.vue";
export default{
	data() {
		return {
			staticUrl : this.staticUrl,
			lists: [
				{ img: 'comments.png', title: '评论界面', path: "comments", desc: "" },
				{ img: 'search.png', title: '搜索界面', path: "search", desc: "清空关键字功能" },
				{ img: 'login.png', title: '登录、注册', path: "login", desc: "" },
				{ img: 'set.png', title: '设置界面', path: "set", desc: "多种模式" },
				{ img: 'city.png', title: '城市列表', path: "city", desc: "仿美团" },
				{ img: 'cityselect.png', title: '地区联动', path: "citySelect", desc: "第三方组件"},
				{ img: 'add.png', title: '图片选择及预览', path: "addfile", desc: "" },
				{ img: 'pullre.png', title: '下拉刷新', path: "pulltorefresh", desc: "" },
				{ img: 'loadmore.png', title: '上拉加载', path: "loadmore", desc: "" },
				{ img: 'table2.png', title: '普通表格', path: "table2", desc: "" },
				{ img: 'table.png', title: '数据表格', path: "table", desc: "横向拖动" },
				{ img: 'timeline.png', title: '时间轴', path: "timeline", desc: "" },
				{ img: 'cate.png', title: '产品分类', path: "cate", desc: "" },
				{ img: 'shoppingcart.png', title: '购物车', path: "shoppingcart", desc: "自动结算" },
				{ img: 'filter.png', title: '条件筛选', path: "filter", desc: "" },
				{ img: 'waterfall.png', title: '瀑布流', path: "waterfall", desc: "" },
				{ img: 'crooper.png', title: '图片剪裁', path: "crooper", desc: "以移动区域为基础，更高效" },
				{ img: 'product.png', title: '商品详情', path: "product", desc: ""},
				{ img: 'lazy.png', title: '图片懒加载', path: "lazyload", desc: "动态加载"},
				{ img: 'boxes.png', title: 'ECharts', path: "echarts", desc: "多维度数据分析组件" },
				// #ifdef APP-PLUS
				{ img: 'navbar.png', title: '自定义导航', path: "navBtn", desc: "支持 app及h5"},
				{ img: 'navbar.png', title: '渐变导航', path: "navTransparent", desc: "支持 app及h5"},
				{ img: 'im.png', title: 'IM 即时通讯', path: "im"},
				// #endif
				// #ifdef MP-WEIXIN
				{ img: 'im.png', title: 'IM 即时通讯', path: "im"},
				// #endif
				// #ifdef H5
				{ img: 'navbar.png', title: '自定义导航', path: "navBtn", desc: "支持 app及h5"},
				{ img: 'navbar.png', title: '透明导航', path: "navTransparent", desc: "支持 app及h5"},
				// #endif
				{ img: 'skeleton.png', title: '骨架屏', path: "skeleton"},
				{ img: 'segmented-control.png', title: '分段切换', path: "segmented-control", desc: "区别于选项卡效率更高"},
				{ img: 'lotteryDraw.png', title: '抽奖活动', path: "lotteryDraw", desc: ""},
				{ img: 'scratchCard.png', title: '刮刮卡抽奖', path: "scratchCard", desc: ""},
				{ img: 'questionnaire.png', title: '问卷界面', path: "questionnaire" },
				{ img: 'address.png', title: '地址管理', path: "address" },
				{ img: 'idcard.png', title: '身份证上传', path: "IDcard" }
			]
		}
	},
	onLoad:function(){
		
	},
	components:{
		graceHeaderLineForApp
	}
}
</script>
<style>
/*
版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/
</style>