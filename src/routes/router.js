import { createRouter, createWebHistory  } from "vue-router";
import ProductDetails from "../components/ProductDetails.vue";
import App from "../App.vue";
import MainLayout from "../components/MainLayout.vue";
import MainPage from "../components/MainPage.vue";
import LIstProducts from "../components/LIstProducts.vue";

const routes = [
    {
        path: '/', 
        component: MainLayout, 
        children: [
            {path: '', component: MainPage},
            {path: 'product/:id', name: 'productDetails', component: ProductDetails},
            {path: 'search/:category?', name:'search', component: LIstProducts}
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

