<template>
  <div class="d-flex justify-content-center">
	<table class="table table-bordered table-responsive">
		<thead>
			<td>No</td>
			<td>Product Name</td>
			<td>Action</td>
		</thead>
		<tbody>
			<div v-for="(item, index) in this.data.data">
				<tr>
					<td>
						{{ index + parseInt('1') }}
					</td>
					<td>
						{{ item.ProductName }}
					</td>
					<td>
						<div class="d-flex justify-content-center">
							<router-link :to='{name:"transactionform", params: {status: "show", index: item.id}, }' class="btn btn-warning btn-sm">
								Detail
							</router-link>
							<router-link :to='{name:"transactionform", params: {status: "edit", index: item.id}, }' class="btn btn-warning btn-sm">
								Edit
							</router-link>
						</div>
					</td>
				</tr>
			</div>
		</tbody>
	</table>
  </div>
</template>

<script>
export default {              
  name: 'ProductIndexComponent',
  data(){
	return{
		data:{
			data:[],
			status:[],
		},
	}
  },
  mounted(){
	this.loaddata()
  },
  methods:{
	async loaddata(){
		let urllink = `http://127.0.0.1:4000/product/index`;
		let tokenStr = localStorage.getItem('token');
		await this.axios.get(urllink, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).then(response=>{
			alert(response.data.data);
			this.data.data = response.data.data;
			this.data.status = response.data.status;
		}).catch(error=>{
			console.log(error)
			this.data.data = [];
		})
	},
  },
}
</script>