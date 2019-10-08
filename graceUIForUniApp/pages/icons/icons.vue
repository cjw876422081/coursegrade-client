<template>
	<view>
		<graceHeader title="内置图标" desc="图标扩展请观看视频教程"></graceHeader>
		<view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
			<view style="padding:50upx 0;" class="grace-wrap">
				<view class="grace-boxes" v-for="(item, index) in icons" :key="index">
					<view :class="'grace-boxes-img grace-iconfont icon-'+item.enName"></view>
					<view class="grace-boxes-text">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			icons : [
				{ enName: "shoppingcard", name : "购物车"},
				{ enName: "share", name: "分享" },
				{ enName: "position", name: "位置" },
				{ enName: "safe", name: "安全" },
				{ enName: "time", name: "时间" },
				{ enName: "home", name: "主页" },
				{ enName: "back", name: "返回" },
				{ enName: "star", name: "星标" },
				{ enName: "zan", name: "赞" },
				{ enName: "pinglun", name: "评论" },
				{ enName: "weixin", name: "微信" },
				{ enName: "weibo", name: "微博" },
				{ enName: "qq", name: "QQ" },
				{ enName: "write", name: "填写" },
				{ enName: "remove", name: "删除" },
				{ enName: "search", name: "搜索" },
				{ enName: "close", name: "关闭" },
				{ enName: "close2", name: "关闭" },
				{ enName: "refresh", name: "刷新" },
				{ enName: "loading", name: "加载" },
				{ enName: "arrow-left", name: "箭头左" },
				{ enName: "arrow-right", name: "箭头右" },
				{ enName: "arrow-up", name: "箭头上" },
				{ enName: "arrow-down", name: "箭头下" },
				{ enName: "shoucang", name: "收藏" },
				{ enName: "eye", name: "浏览" },
				{ enName: "shaixuan", name: "筛选" },
				{ enName: "right", name: "对号" },
				{ enName: "shoucang", name: "收藏" },
				{ enName: "time", name: "时间"},
				{ enName: "eye", name: "眼睛" },
				{ enName: "shaixuan", name: "筛选" },
				{ enName: "share3", name: "分享3" },
				{ enName: "voice", name: "语音" },
				{ enName: "photograph", name: "拍照" },
				{ enName: "keyboard", name: "键盘" }						
			]
		}
	}
}
</script>
<style>
.grace-boxes{width:25%; margin:0}
.grace-boxes-img{justify-content:center; font-size:50upx; line-height:80upx;}
</style>