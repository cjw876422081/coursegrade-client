<template>
	<view class="grace-padding">
		<!-- 文章详情 start -->
	  <view class="grace-h4 grace-blod">Flex 布局教程 (文章详情及评论界面)</view>
	  <view class="grace-text-small">graceUI 发布于 2018-09-20</view>
	  <view class="grace-text" style="margin-top:12upx;">
		<image :src="staticUrl + 'text-banner.png'" mode="widthFix"></image>
		<text>布局的传统解决方案，基于盒状模型，依赖 display 属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。
	2009年，W3C 提出了一种新的方案----Flex 布局......
		</text>
	  </view>
		<!-- 文章详情 end-->
		<view class="grace-title" style="margin-top:60upx;">
			<view class="grace-h5 grace-blod">网友评论</view>
		</view>
		<!-- 评论区 start -->
		<view class="grace-comment">
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image :src="staticUrl + 'logo.png'" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>刘美丽</text>
						<text class="grace-iconfont icon-zan"></text>
					</view>
					<view class="grace-comment-date">
						<text>08/10 08:12</text>
						<text>102</text>
					</view>
					<view class="grace-comment-content">上天呀！我渴望与你相知相惜，长存此心永不褪减。</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image :src="staticUrl + 'logo.png'" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>马克一天</text>
						<text class="grace-iconfont icon-zan grace-comment-zan"> 100</text>
					</view>
					<view class="grace-comment-content">除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image :src="staticUrl + 'logo.png'" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>今生缘</text>
						<text class="grace-iconfont icon-zan"> 66</text>
					</view>
					<view class="grace-comment-content">人面不知何处去，桃花依旧笑春风。</view>
					<view class="grace-comment-date">
						<text>08/10 07:55</text>
					</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image :src="staticUrl + 'logo.png'" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>小猫咪</text>
						<text class="grace-iconfont icon-zan"> 120</text>
					</view>
					<view class="grace-comment-content">海上生明月，天涯共此时。。</view>
					<view class="grace-comment-date">
						<text>2天前</text>
						<text class="grace-comment-replay-btn">5回复</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论区 end -->
		<view class="grace-more-bottom">
			<navigator class="grace-border">查看全部评论 <text class="grace-iconfont icon-arrow-right"></text></navigator>
		</view>
		<view style="height:100upx;"></view>
		<!-- 评论输入框 -->
		<view class="grace-footer">
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input type="text" placeholder="写评论"></input>
			</view>
			<view class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			staticUrl: this.staticUrl
		}
	},
}
</script>
<style>
page{background:#FFF;}
</style>
