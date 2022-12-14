import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TransactionView from '../views/TransactionView.vue'
import TransactionForm from '../components/content/TransactionForm.vue'
import ProductView from '../views/ProductView.vue'
import ProductForm from '../components/content/ProductForm.vue'
import CustomerView from '../views/CustomerView.vue'
import CustomerForm from '../components/content/CustomerForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
	path: '/transaction',
	name: 'transaction',
	component: TransactionView,
  },
  {
	path: '/transaction/:status/:index',
	name: 'transactionform',
	component: TransactionForm,
  },
  {
	path: '/product',
	name: 'product',
	component: ProductView,
  },
  {
	path: '/product/:status/:index',
	name: 'productform',
	component: ProductForm,
  },
  {
	path: '/customer',
	name: 'customer',
	component: CustomerView,
  },
  {
	path: '/customer/:status/:index',
	name: 'customerform',
	component: CustomerForm,
  },
  /* {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" * '../views/AboutView.vue')
  } */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
