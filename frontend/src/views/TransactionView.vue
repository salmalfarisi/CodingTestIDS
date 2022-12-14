<template>
	<div class="container mt-5">
		<div class="h3 text-black font-weight-bold">
			Transaction
		</div>
		<TransactionIndexComponent/>
		<div v-if="showhtml === true">
			<div class="d-flex justify-content-end">
				<router-link :to='{name:"transactionform", params: {status: "create", index: "0"}, }' class="btn btn-primary btn-sm end-0">
					Create new Data
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import TransactionIndexComponent from '../components/content/TransactionIndexComponent.vue';

export default{
	name:'TransactionView',
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
			if(currentlink == "http://127.0.0.1:8080/transaction"){
				this.showhtml = true;
			}
		}
	},
	components:{
		TransactionIndexComponent,
	}
}
</script>