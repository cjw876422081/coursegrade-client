<template>
	<view>
		<graceHeader title="可移动区域" desc="请拖动图标尝试"></graceHeader>
		<view class="grace-bg-white grace-common-mt grace-padding grace-common-border">
			<view class="grace-text-small grace-center" style="margin-top:20px;">普通模式</view>
			<view class="grace-padding">
				<movable-area :scale-area="true">
					<movable-view direction="all" @change="onChange" x="120">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</movable-view>
				</movable-area>	
			</view>
			<view class="grace-text-small grace-center" style="margin-top:20px;">横向拖动</view>
			<view class="grace-padding">
				<movable-area>
					<movable-view direction="horizontal" @change="onChange">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</movable-view>
				</movable-area>
			</view>
			<view class="grace-text-small grace-center" style="margin-top:20px;">竖向拖动</view>
			<view class="grace-padding">
				<movable-area>
					<movable-view direction="vertical" @change="onChange">
						<image src="../../static/imgs/logo.png" mode="widthFix"></image>
					</movable-view>
				</movable-area>	
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		methods: {
			onChange : function(e){
				console.log(e);
			}
		},
	}
</script>
<style>
movable-area{background:#F0F0F0; width:100%; height:300upx;}
movable-view{width:120upx; height:120upx; background:#FFFFFF;}
movable-view image{width:120upx; height:120upx; border-radius:5upx;}
</style>
