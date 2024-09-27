import axios from 'axios';

const API_URL = 'http://localhost:5000/api'

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`)
        return response.data        
    } catch (error) {
        console.error('ERROR fetching products: ', error)
        throw error
    }
}
export const createProduct = async () => {
    try {
        const response = await axios.post(`${API_URL}/product`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        return response.data
    } catch (error) {
        console.error('Error creating product:', error)
        throw error
    }
}
export const getOneProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}
export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`,      updatedProduct, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data 
    } catch (error) {
        console.error('Error updating product:', error)
        throw error
    }   
}
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/products/${id}`)
    } catch (error) {
        console.error('Error deleting product:', error)
        throw error
    }
}