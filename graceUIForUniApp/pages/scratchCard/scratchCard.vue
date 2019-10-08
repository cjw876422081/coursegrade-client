<template>
	<view>
		<graceHeader title="刮刮卡" desc="刮一刮,好运来 ^_^"></graceHeader>
		<view class="garce-scratch-card-bg" :style="{marginTop:'50px', width: graceContextWidth + 'px', height : graceContextHeight + 'px'}">
		  <image :src="prizesBGimg" mode='widthFix'></image>
		  <canvas 
			canvas-id="graceCanvas" 
			:style="{width:graceContextWidth + 'px', height:graceContextHeight + 'px'}" 
			@touchstart='touchstart'
			@touchmove='touchmove' 
			@touchend='touchend' 
			></canvas>
		</view>
		<view class="grace-h5 grace-blod grace-center" style="margin-top:30px;">- 活动说明 -</view>
		<view class="grace-text grace-center">
		  活动说明文字内容...
		</view>
	</view>
</template>
<script>
var  graceContext;
export default {
	data() {
		return {
			// 画布大小 为了兼容小屏幕手机（宽 320px) 建议宽小于等于 300 
			graceContextWidth  : 300,
			graceContextHeight : 180,
			prizes : [
			  // 格式 : {name:奖品名称, img : 奖品图片地址 (宽高等于 graceContextWidth 和 graceContextHeight 或者等比例放大)}
			  { name: "小米8青春版", img: "https://staticimgs.oss-cn-beijing.aliyuncs.com/mi8.png"},
			  { name: "感谢参与", img: "https://staticimgs.oss-cn-beijing.aliyuncs.com/xxcy.png" }
			],
			prizesBGimg : '',
			clearArea : [],
			isClearEnd : false
		};
	},
	onLoad: function (options) {
		this.isClearEnd = false;
		graceContext = uni.createCanvasContext('graceCanvas');
		this.canvasInit();
	},
	methods:{
		// 初始化
		canvasInit : function(){
			// prizeId 代表 : 奖品 id，代表用户是否中奖及奖品信息 请自行设计中奖算法最终得到奖品id即可
			var prizeId = 0; //0 代表小米8, 1 代表 谢谢参与 实际开发以真实奖品为准
			// 绘制奖品
			this.prizesBGimg = this.prizes[prizeId].img;
			// 绘制遮盖层
			graceContext.setFillStyle("#D1D2D3");
			graceContext.fillRect(0, 0, this.graceContextWidth, this.graceContextHeight);
			graceContext.save();
			// 绘制刮字背景
			const pattern = graceContext.createPattern('../../static/imgs/gua.png', 'repeat');
			graceContext.fillStyle = pattern;
			graceContext.fillRect(0, 0, this.graceContextWidth, this.graceContextHeight);
			graceContext.save();
			// 绘制文字
			graceContext.setFillStyle("#000000");
			graceContext.setFontSize(15)
			graceContext.setTextAlign('center')
			graceContext.fillText("刮一刮，好运来!", this.graceContextWidth / 2, this.graceContextHeight/2);
			graceContext.draw();
		},
		touchstart : function(e){
			if (this.isClearEnd ){return;}
			var startX = e.touches[0].x;
			var startY = e.touches[0].y;
			this.clearArea.push({ x: startX, y: startY});
			this.clearBase();
		},
		touchmove: function (e) {
			if (this.isClearEnd) { return; }
			var endX = e.touches[0].x;
			var endY = e.touches[0].y;
			// 记录要擦除的区域
			this.clearArea.push({ x: endX, y: endY });
			this.clearBase();
		},
		touchend: function (e) {
			if (this.isClearEnd ){return;}
			// 计算是否全部展示
			// 获取 最小的 x y
			var minX = this.clearArea[0].x;
			var minY = this.clearArea[0].y;
			var maxX = this.clearArea[0].x;
			var maxY = this.clearArea[0].y;
			for (var i = 1; i < this.clearArea.length; i++){
			  if (this.clearArea[i].x > maxX){
				maxX = this.clearArea[i].x;
			  }
			  if (this.clearArea[i].y > maxY) {
				maxY = this.clearArea[i].y;
			  }
			  if (this.clearArea[i].x < minX) {
				minX = this.clearArea[i].x;
			  }
			  if (this.clearArea[i].y < minY) {
				minY = this.clearArea[i].y;
			  }
			}
			var width = maxX - minX;
			var height = maxY - minY;
			var acreage = width * height;
			if (acreage * 6 > this.graceContextWidth * this.graceContextHeight){
			  this.isClearEnd = true;
			  graceContext.clearRect(0, 0, this.graceContextWidth, this.graceContextHeight);
			  graceContext.draw();
			  this.clearArea = [];
			}
		},
		clearBase : function(){
			graceContext.setFillStyle("#D1D2D3");
			graceContext.fillRect(0, 0, this.graceContextWidth, this.graceContextHeight);
			const pattern = graceContext.createPattern('../../static/imgs/gua.png', 'repeat')
			graceContext.fillStyle = pattern
			graceContext.fillRect(0, 0, this.graceContextWidth, this.graceContextHeight);
			for (var i = 0; i < this.clearArea.length; i++){
			  graceContext.clearRect(this.clearArea[i].x, this.clearArea[i].y, 50, 50);
			}
			graceContext.draw();
		}
	}
}
</script>
<style>
page{background:#F6F7F8;}
.garce-scratch-card-bg {width: 300px; height: 180px; position: relative; margin:5px auto; overflow:hidden; background:#F6F7F8; border:5px solid #FFF; box-shadow:2px 2px 2px #ccc;}
.garce-scratch-card-bg image{width:100%;}
.garce-scratch-card-bg canvas{position:absolute; z-index:2; left:0; top:0;}
</style>