<template>
	<view>
		<robby-image-upload v-model="imageData" :server-url="serverUrl" fileKeyName="file"></robby-image-upload>
	</view>
</template>

<script>
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
	export default {
		components: {robbyImageUpload},
		data() {
			return {
				imageData:[],
				serverUrl:"/api/file/upload"
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
