<template  >
	<view class="content">	
	<p style="text-align: center;">
		授课内容
	</p>
		<view class="choose">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view class="uni-input">{{array[index]}}</view>
                    </picker>
		</view>
		<!-- <select 
		style="left: 62px;
		top: 386px;
		width: 247px;
		height: 47px;
		line-height: 20px;
		background-color: rgba(255, 255, 255, 1);
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);">
			<option>请选择课程名称：</option>
			<option>1</option>
			<option>2</option>
			<option>3</option>
		</select> -->
		
		<view class="uni-title uni-common-pl"></view>
		        <view class="uni-title uni-common-pl"></view>
		        <view class="uni-textarea">
				<textarea class="MemoText" placeholder-style="color:#888888" placeholder="授课内容:"/>
				</view>
		
		
		<view class="uni-title uni-common-pl"></view>
		        <view class="uni-title uni-common-pl"></view>
		        <view class="uni-textarea">
				<textarea class="targetText" placeholder-style="color:#888888" placeholder="授课目标:"/>
				</view>
		<!-- <button
		style="left: 10px;
		top: 276px;
		width: 247px;
		height: 37px;
		border-radius: 4px;
		background-color: rgba(173, 185, 255, 1);
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);"  
		type="primary" plain="true">添加</button> -->
		<button type="primary"
		style="left: 10px;
		top: 276px;
		width: 247px;
		height: 37px;
		border-radius: 4px;
		text-align: center;
		"
		>添加</button>
		
	</view>
</template>

<script>
export default {
    data() {
        const currentDate = this.getDate({
            format: true
        })
        return {
            title: 'picker',
            array: ['请选择课程：','中国', '美国', '巴西', '日本'],
            index: 0,
            date: currentDate,
            time: '12:01'
        }
    },
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods: {
        bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value
        },
        bindDateChange: function(e) {
            this.date = e.target.value
        },
        bindTimeChange: function(e) {
            this.time = e.target.value
        },
        getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
    }
}
  
</script>


<style>
	/* .btn{
		left: 84px;
		top: 386px;
		width: 247px;
		height: 37px;
		border-radius: 4px;
	
		font-size: 14px;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);
	} */
	.MemoText{
		left: 62px;
		top: 150px;
		width: 247px;
		height: 57px;
		line-height: 20px;
		color: rgba(136, 136, 136, 1);
		font-size: 14px;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);
		}
	.targetText{
		left: 62px;
		top: 220px;
		width: 247px;
		height: 57px;
		line-height: 20px;
		color: rgba(136, 136, 136, 1);
		font-size: 14px;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);
	}
	.choose{
		text-align: center;
		width: 247px;
		height: 24px;
		font-size: 14px;
		font-family: Microsoft Yahei;
		border: 1px solid rgba(187, 187, 187, 1);
		
	}

</style>
