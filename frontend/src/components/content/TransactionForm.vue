<template>
  <div class="container mt-5">
	<div class="h3 text-black font-weight-bold">
		Transaction
	</div>
	<form @submit.prevent="submitdata()">
		<div class="row mb-3">
			<label class="col-2 col-form-label">Product Name</label>
			<div class="col-10">
				<select v-model="productID" class="form-control">
					<option v-for="optiondata in selectproduct" :value="optiondata.id" class="form">
						{{ optiondata.ProductName }}
					</option>
				</select>
			</div>
		</div>
		<div class="row mb-3">
			<label class="col-2 col-form-label">Customer Name</label>
			<div class="col-10">
				<select v-model="customerID" class="form-control">
					<option v-for="optiondata in selectcustomer" :value="optiondata.id">
						{{ optiondata.customerName }}
					</option>
				</select>
			</div>
		</div>
		<div class="row mb-3">
			<label class="col-2 col-form-label">Transaction Date</label>
			<div class="col-10">
				<input type="date" v-model="transactionDate" class="form-control" value="transactionDate" required :disabled="showbutton == false">
			</div>
		</div>
		<div class="mb-3">
			<div class="row">
				<label class="col-2 form-check-label">
				  Payment Status
				</label>
				<div class="col-10">
					<input v-model="statuspayment" value="statuspayment" class="d-flex form-check-input" type="checkbox">
				</div>
			</div>
		</div>
		<div class="row mb-3">
			<label class="col-2 col-form-label">Amount</label>
			<div class="col-10">
				<input type="number" v-model="amount" class="form-control" min="1" value="productID" required :disabled="showbutton == false">
			</div>
		</div>
		<div class="position-relative mt-5">
			<div class="position-absolute bottom-0 start-0">
				<router-link :to='{name:"transaction" }' class="btn btn-danger">
					Back
				</router-link>
			</div>
			<div class="position-absolute bottom-0 end-0">
				<div v-if="showbutton == true">
					<button type="submit" class="btn btn-primary">{{ this.typeform }}</button>
				</div>
			</div>
		</div>
	</form>
  </div>
</template>

<script>
export default{
	name:'ProductForm',
	data(){
		return{
			data:{
				data:[],
				status:[],
			},
			selectproduct:[],
			selectcustomer:[],
			typeform:'',
			status:'',
			id:'',
			urllink:'',
			method:'',
			showbutton:true,
			productID:'',
			customerID:'',
			transactionDate:'',
			amount:'',
			statuspayment:'',
		}
	},
	mounted(){
		this.loaddata(),
		this.loadselectoption()
	},
	methods:{
		async loadselectoption(){
			let urllink = `http://127.0.0.1:4000/product/index`;
			let tokenStr = localStorage.getItem('token');
			await this.axios.get(urllink, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).then(response=>{
				this.selectproduct = response.data.data
			}).catch(error=>{
				console.log(error)
				this.data = {}
			})
		},
		async loaddata(){
			this.status = `${this.$route.params.status}`;
			if(this.status == 'create'){
				this.typeform = 'Save';
			}
			else{
				if(this.status == 'edit'){
					this.typeform = 'Update';
				}
				else{
					this.showbutton = false;
				}
				let urllink = `http://127.0.0.1:4000/transaction/show/${this.$route.params.index}`;
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
				this.urllink = `http://127.0.0.1:4000/transaction/store`;
				this.typesubmit = this.axios.post;
			}
			else{
				this.urllink = `http://127.0.0.1:4000/transaction/update/${this.$route.params.index}`;
				this.typesubmit = this.axios.put;
			}
			let tokenStr = localStorage.getItem('token');
			let submitform = {
				productID:this.productID,
				customerID:this.customerID,
				amount:this.amount,
				transactionDate:this.transactionDate,
				transactionstatus:this.statuspayment,
			};
			await this.typesubmit(this.urllink, this.submitform, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).then(response =>{
				this.$router.push({name:'transaction'});
			}).catch(error=>{
				alert('error!!')
			})
		}
	}
}
</script>