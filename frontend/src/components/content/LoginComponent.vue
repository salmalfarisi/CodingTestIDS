<template>
  <div class="d-flex justify-content-center">
	<div style="position:absolute; top:25%; width:50%;" class="card">
	  <div class="card-header">
		<div class="card-title">
			Sistem ERP
		</div>
	  </div>
	  <div class="card-body">
		<form @submit.prevent="submitdata">
		  <div class="row mb-3">
			<label for="inputEmail3" class="col-2 col-form-label">Username</label>
			<div class="col-10">
			  <input type="text" v-model="data.username" name="username" value="data.username" class="form-control">
			</div>
		  </div>
		  <div class="row mb-3">
			<label for="inputPassword3" class="col-2 col-form-label">Password</label>
			<div class="col-10">
			  <input type="password" v-model="data.password" name="password" value="data.password" class="form-control">
			</div>
		  </div>
		  <button type="submit" class="d-flex btn btn-primary">Sign in</button>
		</form>
	  </div>
	</div>
  </div>
</template>

<script>

export default {
  name: 'LoginComponent',
  data(){
    return{
		data:{
			username:'',
			password:'',
		},
	}
  },
  methods:{
	async submitdata(){
		let urllink = `http://127.0.0.1:4000/account/login`;
		await this.axios.post(urllink, {username: this.data.username, password: this.data.password}).then(response=>{
			this.data = response.data.data;
			localStorage.setItem('token', this.data.token);
			localStorage.setItem('name', this.data.name);
			localStorage.setItem('username', this.data.username);
			localStorage.setItem('id', this.data.id);
			localStorage.setItem('email', this.data.email);
			this.success = response.data.status
			if(this.success[0].name == "SUCCESS"){
				location.reload();
			}
			else{
				alert("username or password not found in database");
			}
		}).catch(error=>{
			alert('error!!')
		})
	}
  },
}
</script>