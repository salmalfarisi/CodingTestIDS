<template>
  <div class="container mt-5">
	<div class="h3 text-black font-weight-bold">
		Customer
	</div>
	<form @submit.prevent="submitdata()">
		<div class="row mb-3">
			<label class="col-2 col-form-label">Name</label>
			<div class="col-10 ">
				<input type="text" v-model="customerName" class="form-control" value="customerName" required>
			</div>
		</div>
		<div class="position-relative mt-5">
			<div class="position-absolute bottom-0 start-0">
				<router-link :to='{name:"customer" }' class="btn btn-danger">
					Back
				</router-link>
			</div>
			<div class="position-absolute bottom-0 end-0">
				<button type="submit" class="btn btn-primary">{{ this.typeform }}</button>
			</div>
		</div>
	</form>
  </div>
</template>

<script>
export default{
	name:'CustomerForm',
	data(){
		return{
			data:{
				data:[],
				status:[],
			},
			typeform:'',
			status:'',
			customerName:'',
			id:'',
			urllink:'',
			method:'',
		}
	},
	mounted(){
		this.loaddata()
	},
	methods:{
		async loaddata(){
			this.status = `${this.$route.params.status}`;
			if(this.status == 'create'){
				this.typeform = 'Save';
			}
			else{
				this.typeform = 'Update';
				let urllink = `http://127.0.0.1:4000/customer/show/${this.$route.params.index}`;
				let tokenStr = localStorage.getItem('token');
				await this.axios.get(urllink, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).then(response=>{
					this.data = response.data.data
					this.status = response.data.status
				}).catch(error=>{
					console.log(error)
					this.data = {}
				})
			}
		},
		async submitdata(){
			let urllink = '';
			let typesubmit = '';
			if(this.typeform == 'Save'){
				this.urllink = `http://127.0.0.1:4000/customer/store`;
				this.typesubmit = this.axios.post;
			}
			else{
				this.urllink = `http://127.0.0.1:4000/customer/update/${this.$route.params.index}`;
				this.typesubmit = this.axios.put;
			}
			let tokenStr = localStorage.getItem('token');
			await this.typesubmit(this.urllink, { customerName:this.customerName, userID:localStorage.getItem('name') }, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).then(response =>{
				this.$router.push({name:'customer'});
			}).catch(error=>{
				alert('error!!')
			})
		}
	}
}
</script>