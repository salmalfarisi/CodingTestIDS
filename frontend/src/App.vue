<template>
  <div id="app">
	<div v-if="shownavbar === true">
		<Navbar/>
	</div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/layout/navbar.vue';

export default{
	name: 'app',
	data(){
		return{
			shownavbar:false
		}
	},
	mounted(){
		this.loadsession()
	},
	methods:{
		loadsession(){
			let sessiondata = localStorage.getItem('token');
			if(sessiondata != null){
				this.shownavbar = true;
				this.$router.push({name:'transaction'})
			}
		}
	},
	components:{
		Navbar
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
