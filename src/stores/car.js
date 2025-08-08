import { defineStore } from "pinia";


export const useCarStore = defineStore('car', {
    state: () =>{
        return {carList: []}
    },
    getters:{
        getPriceOfProduct: (state) =>{
            return (id) =>{
                const item = state.carList.find(p => p.product.id ===id)
                return item ? item.product.price * item.quantity : 0;
            }
        },
        cartTotal: (state) =>{
            return state.carList.reduce((total, item) =>{
                return total + (item.product.price * item.quantity)
            }, 0);
        }
    },
    actions: {
        addProduct(product) {
            const existing = this.carList.find(p => p.product.id === product.id)
            if(existing){
                existing.quantity += 1;
            }else{
                this.carList.push({product, quantity: 1})
            }
        },
        removeProduct(id){
            this.carList = this.carList.filter(p => p.product.id !== id)
        },
        increaseQuantity(id){
            const item = this.carList.find(p => p.product.id === id)
            if (item) item.quantity += 1
        },
        decreaseQuantity(id){
            const item = this.carList.find(p => p.product.id === id)
            if(item){
                if(item.quantity > 1){
                    item.quantity -= 1;
                }else {
                    this.removeProduct(id)
                }
            }
        }
    }
})
