const API_URL = "https://dummyjson.com/products";


function getAllProducts() {
    return fetch(`${API_URL}?select=title,price,description,thumbnail,rating`)
    .then(response => response.json())
    .then(data => data.products)
    .catch(error =>{
        throw new Error("Failed to fetch" + error.message)
    })
}

function getCategoryList() {
    return fetch(`${API_URL}/category-list`)
    .then(res => res.json())
    .then(data => data)
    .catch(e => {
        throw new Error("Failed to fetch categories: "+ e.message)
    })
}

function getProductsRandom() {
    return fetch(`${API_URL}?limit=4&skip=40&select=images,title&sortBy=title&order=asc`)
    .then(res => res.json())
    .then(data => data.products)
    .catch(error =>{
        throw new Error("Failed to fetch" + error.message)
    })
}

function productById(params) {
    return fetch(`${API_URL}/${params.id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(e => {
        throw new Error("Failed to fetch product by id: ", e.message)
    })
}

function getNameOfProducts(params) {
    return fetch(`${API_URL}/search?q=${params.title}&select=title&limit=10`)
    .then(res => res.json())
    .then(data => data.products)
    .catch(e => {
        throw new Error("Failed to fetch products by name: " + e.message)
    })
}

function getProductsByName(params) {
    return fetch(`${API_URL}/search?q=${params.title}&select=title,price,description,price,thumbnail,rating`)
    .then(res => res.json())
    .then(d => d.products)
    .catch(e => {
        throw new Error(e.message)
    })
}

function productsByCategory(params) {
    return fetch(`${API_URL}/category/${params.category}?select=title,price,thumbnail,description,rating`)
    .then(r => r.json())
    .then(d => d.products)
    .catch(e => {
        throw new Error("Failed to fetch products by cateogory " + e.message)
    })
}

function productsBySearch(params) {
    
}

export {
    getAllProducts, 
    getCategoryList, 
    getProductsRandom,
    productById,
    getNameOfProducts,
    getProductsByName,
    productsByCategory
}

