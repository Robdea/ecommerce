import { defineStore } from "pinia";


export const useCarStore = defineStore('car', {
    state: () =>({
        carList: JSON.parse(localStorage.getItem('carList')) || []
    }),
    getters:{
        getPriceOfProduct: (state) =>{
            return (id) =>{
                const item = state.carList.find(p => p.product.id ===id)
                const result = item ? item.product.price * item.quantity : 0 
                return result.toFixed(2);
            }
        },
        cartTotal: (state) =>{
            const total = state.carList.reduce((total, item) =>{
                return total + (item.product.price * item.quantity)
            }, 0);
            return total.toFixed(2)
        },
        totalProducts: (state) =>  state.carList.reduce((total, item) => total += item.quantity ,0),
        isInCart: (state) => (id) =>{
            return state.carList.some(p => p.product.id === id)
        },
    },
    actions: {
        saveToLocalStorage(){
            localStorage.setItem('carList', JSON.stringify(this.carList))
        },
        addProduct(addProduct) {
            const existing = this.carList.find(p => p.product.id === addProduct.id)
            if(existing){
                existing.quantity += 1;
            }else{
                const product = {
                    id: addProduct.id,
                    price: addProduct.price,
                    thumbnail: addProduct.thumbnail,
                    title: addProduct.title
                }

                this.carList.push({product, quantity: 1})
            }
            this.saveToLocalStorage();
        },
        removeProduct(id){
            this.carList = this.carList.filter(p => p.product.id !== id)
            this.saveToLocalStorage();
        },
        increaseQuantity(id){
            const item = this.carList.find(p => p.product.id === id)
            if (item) item.quantity += 1;
            this.saveToLocalStorage();
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
            this.saveToLocalStorage();
        },
        clearCart(){
            this.carList = []
            this.saveToLocalStorage();
        }
    }
})
