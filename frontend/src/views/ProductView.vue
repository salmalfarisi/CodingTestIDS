<template>
	<div class="container mt-5">
		<div class="h3 text-black font-weight-bold">
			Product
		</div>
		<ProductIndexComponent/>
		<div v-if="showhtml === true">
			<div class="d-flex justify-content-end">
				<router-link :to='{name:"productform", params: {status: "create", index: "0"}, }' class="btn btn-primary btn-sm end-0">
					Create new Data
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import ProductIndexComponent from '../components/content/ProductIndexComponent.vue';

export default{
	name:'ProductView',
	data(){
		return{
			showhtml:false,
		}
	},
	mounted(){
		this.checklink()
	},
	methods:{
		async checklink(){
			let currentlink = window.location.href;
			if(currentlink == "http://127.0.0.1:8080/product"){
				this.showhtml = true;
			}
		}
	},
	components:{
		ProductIndexComponent,
	}
}
</script>