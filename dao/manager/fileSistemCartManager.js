import FileProductManager from "./fileSystemProductManager,js";
import { promises as fs } from "fs"
import path from 'path';

const cartFilePath = path.resolve(__dirname, 'cart.json');

export class FileCartManager {
    constructor() {
        console.log("FileCartManager funciona");
        this.productManager = new FileProductManager();
    }

    async getCart() {
        try {
            const cart = await fs.promises.readFile(cartFilePath, 'utf-8');
            return JSON.parse(cart);
        } catch (error) {
            console.error("Error al obtener el carrito:", error.message);
            return [];
        }
    }

    async newCart() {
        try {
            const cart = { id: Date.now(), products: [] };
            await fs.promises.writeFile(cartFilePath, JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.error("Error al crear un nuevo carrito:", error.message);
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.getCart();
            const product = await this.productManager.getProductById(productId);

            if (!product) {
                console.error("El producto no existe.");
                return;
            }

            const index = cart.findIndex(item => item.id === cartId);
            if (index !== -1) {
                const existingProductIndex = cart[index].products.findIndex(item => item.productId === productId);
                if (existingProductIndex !== -1) {
                    cart[index].products[existingProductIndex].quantity++;
                } else {
                    cart[index].products.push({ productId, quantity: 1 });
                }
                await fs.promises.writeFile(cartFilePath, JSON.stringify(cart));
                console.log("Producto agregado al carrito.");
            } else {
                console.error("El carrito no existe.");
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error.message);
            throw error;
        }
    }
}