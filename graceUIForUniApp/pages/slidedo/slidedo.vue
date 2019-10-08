<template>
	<view>
		<graceHeader title="滚动操作" desc="请在下面的项目上左右滑动"></graceHeader>
		<view>
			<view class="grace-scroll-do grace-bg-white grace-common-mt">
				<scroll-view class="grace-scroll-x" scroll-x v-for="(item, index) in msg" :scroll-left="scrollIndex == index ? 180 : 0" @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index">
					<view class="grace-items">
						<image :src="item.img" mode="widthFix"></image>
						<view class="contents">
							<view class="grace-h5 grace-blod">{{item.title}}</view>
							<view class="grace-text-small">{{item.desc}}</view>
						</view>
					</view>
					<view class="grace-items btn btn-first" :data-id="index" @tap="changStatus" :style="{width : index == deleteIndex ? '0px' : btn1Width + 'px', background:item.status == '已读' ? '#CCCCCC' : '#5959D3', color:item.status == '已读' ? '#999' : '#FFF'}">{{item.status}}</view>
					<view class="grace-items btn" :data-id="index" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px'}">删除</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
var _self, x, y;
export default {
	data() {
		return {
			//2个按钮的宽度
			btn1Width : 70,
			btn2Width : 70,
			//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
			deleteBtnWidth : 140,
			//正在滑动的索引
			scrollIndex : -1,
			//正在删除的索引
			deleteIndex : -1,
			//模拟数据
			msg : [
				//img - 图片地址 title - 标题 desc - 描述 - status 读取状态
				{ img: '../../static/imgs/logo.png', title: "graceUI", desc: '兼容小程序、uni-app的优秀前端UI', status:"未读"},
				{ img: '../../static/imgs/logo.png', title: "uni-app", desc: 'uni-app 终极跨平台解决方案', status:"未读"},
				{ img: '../../static/imgs/logo.png', title: "hcoder", desc: '专业IT教程', status:"未读"}
			]
		}
	},
	onLoad : function(){
		_self = this;
	},
	methods:{
		removeMsg : function(e){
			var index = e.target.dataset.id;
			//删除确认
			if (this.deleteIndex != index){
				this.deleteIndex = index;
				setTimeout(function(){
					_self.deleteIndex = -1;
				}, 2000);
				return false;
			}
			this.scrollIndex = -1;
			setTimeout(function(){
				_self.msg.splice(index, 1);
				_self.deleteIndex = -1;
			}, 500);
		},
		touchStart: function (e) {
			x = e.mp.changedTouches[0].clientX;
			y = e.mp.changedTouches[0].clientY;
		},
		touchEnd : function(e){
			x = x - e.mp.changedTouches[0].clientX;
			y = y - e.mp.changedTouches[0].clientY;
			if (Math.abs(x) < 50) { return; }
			if (Math.abs(x) < Math.abs(y)) { return; }
			var index = e.currentTarget.dataset.id;
			if (index == this.scrollIndex){return ;}
			_self.scrollIndex = index;
		},
		changStatus : function(e){
			var index = e.currentTarget.dataset.id;
			this.msg[index].status = "已读";
		}
	}
}
</script>
<style>
</style>