<template>
	<div>
	  <nav class="navbar navbar-expand-lg bg-light">
		  <div class="container-fluid">
			<a class="navbar-brand" href="#">ERP</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
				  <router-link :to='{name:"product" }' class="nav-link">
						Product
				  </router-link>
				</li>
				<li class="nav-item">
				  <router-link :to='{name:"customer" }' class="nav-link">
						Customer
				  </router-link>
				</li>
				<li class="nav-item">
				  <router-link :to='{name:"transaction" }' class="nav-link">
						Transaction
				  </router-link>
				</li>
			  </ul>
			  <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
				<li v-on:click="logout()" class="nav-item">
					Logout
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
	</div>
</template>

<script>
export default {
  name: 'Navbar',
  methods:{
	async logout(){
		localStorage.clear();
		this.$router.push({name:'home'});
		location.reload();
	}
  }
}
</script>