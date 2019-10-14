<template>
	<view class="container">
		<view class="top">
			<view style="height: 100%;width: auto;margin-left: 15upx;margin-right: 15upx;border: #007AFF;border-width: 2upx;border-style: solid;">
				<image src="" ></image>
			</view>
			<view style="line-height: 70upx;text-align: center;font-size: 50upx;margin-left: 15upx;margin-right: 15upx;margin-top: 20upx;">
				课程名称
			</view>
			<scroll-view>
				<view style="margin-left: 25upx;margin-right: 25upx;margin-top: 20upx;">
					快讯：这是本课程第10次开课，课程经过超过百万学习者检验，课程更专业、更高质量! 课程建设了微信群，帮助天南海北的学习者建立直接的沟通学习方式，更轻松有效掌握一门Python语言~
					
					
					
					        —— 为什么要学习计算机编程？
					
					        —— 因为编程是件很有趣的事儿，能启迪思维，还有诗和远方...
					
					 
					
					        Python [paɪθən] 语言，由Guido van Rossum大牛在1990年发明，它是当今世界最受欢迎的计算机编程语言，也是一门对大多数人“学了能用、学了有用、学会能久用”的计算生态语言。
					
					       本课程是一门体现大学水平的Python 语言入门课程，采用“理解和运用计算生态”为教学理念，面向Python零基础学习者，不要求学习者有任何编程基础。本课程将帮助大家快速、轻松且系统的学习Python语言，高效编写程序，掌握利用计算机解决问题的基本方法和过程。
					
					       本课程主要讲解“Python基础语法”全体系，包括3个教学部分，共9周内容，教学安排如下：
					
					 
					
					·         第一部分，共2周：Python快速入门，初识Python语言，讲解基本的程序设计方法、熟悉Python语法元素。
					
					·         第二部分，共5周：Python基础语法，深入Python语言，讲解Python基础语法全貌、实践计算问题求解。
					
					·         第三部分，共2周：Python编程思维，运用Python语言，讲解计算生态、程序设计方法学等内容、显著提高编程思维。
					
					 
					
					       本课程共讲解16个经典案例，提供50道以上编程题和100道以上单选题作为课后练习（可选，由学习者可自主完成），帮助大家熟练Python语言编程能力。本课程需要一个9周的学习计划表，完成后将掌握一门可用20年以上的编程语言，学习里程碑如下：
					
					 
					
					·         第2周结束：将学会编写010行左右Python程序，有输入、有输出、带文字、有图形；
					
					·         第7周结束，将熟练编写050行左右Python程序，正式成为程序员(业余)一族；
					
					·         第9周结束，将能够编写100行以上Python程序，拿个证书同时开始像专业程序员一样思考。
					
					
					
					        —— 学了Python能有什么用？
					
					        —— 买房买车找工作、交友美食游世界，似乎都不行... 但却可以：谈理想、某职业、去创新。
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: '课程描述'
			});
		}
	}
</script>

<style scoped>
.container {
	width: 100%;
}
.cover {
	width: 100%;
}
.avatar-box {
	width: 100%;
	height: 100px;
}
.top {
	display: flex;
	flex-direction: column;
	margin-top: 5px;
	height: 190px;
	width: 100%;
}
</style>
