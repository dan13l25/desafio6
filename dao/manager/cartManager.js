import cartsModel from "../models/cart.js";
import Product from "../models/product.js";

export default class CartManager {
    constructor() {
        console.log("CartManager funciona");
    }

    async getCartById(cartId) {
    try {
        const cart = await cartsModel.findById(cartId).lean();
        return cart;
    } catch (error) {
        console.error("Error al obtener el carrito:", error.message);
        return null;
    }
}

    async createCart() {
        try {
            const newCart = new cartsModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito:", error.message);
            return null;
        }
    }

    async addProduct(cartId, productId) {
        try {
            let cart = await cartsModel.findById(cartId);
            if (!cart) {
                console.log("El carrito no existe.");
                return;
            }

            const product = await Product.findById(productId);
            if (!product) {
                console.log("El producto no existe.");
                return;
            }

            const existingProduct = cart.products.find(item => String(item.product) === String(productId));
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
        } catch (error) {
            console.error("Error al añadir producto al carrito:", error.message);
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            let cart = await cartsModel.findById(cartId);
            if (!cart) {
                console.log("El carrito no existe.");
                return;
            }

            const index = cart.products.findIndex(item => String(item.product) === String(productId));
            if (index !== -1) {
                cart.products.splice(index, 1);
                await cart.save();
            } else {
                console.log("El producto no está en el carrito.");
            }
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error.message);
        }
    }
}