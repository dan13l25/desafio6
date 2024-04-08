/*import { promises as fs } from "fs"
import path from 'path';

const productsFilePath = path.resolve(__dirname, 'products.json');

export default class FileProductManager {
    constructor() {
        console.log("fileProductManager funciona") 
    }

    async addProduct(title, description, price, thumbnails, code, stock, status, category, brand) {
        try {
            const products = await this.readProductsFromFile();

            const newProduct = {
                id: Date.now().toString(), 
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                status,
                category,
                brand
            };

            products.push(newProduct);

            await fs.promises.writeFile(productsFilePath, JSON.stringify(products));

            return newProduct;
        } catch (error) {
            console.error("Error al añadir el producto:", error.message);
            throw error;
        }
    }

    async readProducts() {
        try {
            return await this.readProductsFromFile();
        } catch (error) {
            console.error("Error al leer los productos:", error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.readProductsFromFile();
            return products.find(product => product.id === id);
        } catch (error) {
            console.error("Error al obtener el producto:", error.message);
            throw error;
        }
    }

    async getByBrand(brand) {
        try {
            const products = await this.readProductsFromFile();
            return products.filter(product => product.brand === brand);
        } catch (error) {
            console.error("Error al obtener los productos por marca:", error.message);
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            let products = await this.readProductsFromFile();
            products = products.filter(product => product.id !== id);
            await fs.promises.writeFile(productsFilePath, JSON.stringify(products));
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            throw error;
        }
    }

    async updateProduct(id, newData) {
        try {
            let products = await this.readProductsFromFile();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...newData };
                await fs.promises.writeFile(productsFilePath, JSON.stringify(products));
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async readProductsFromFile() {
        try {
            const data = await fs.promises.readFile(productsFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }
}*/

import { promises as fs } from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export class FileProductManager {
    constructor() {
        const currentFileUrl = import.meta.url;
        const currentFilePath = fileURLToPath(currentFileUrl);
        this.path = join(dirname(currentFilePath), "productlist.json");
        this.products = [];
    }

    async writeProductsToFile() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    async addProduct(title, description, price, thumbnail, code, stock, category, status = true) {
        try {
            const id = this.generateUniqueID();

            if (title && description && price && thumbnail && code && stock && category !== undefined) {
                const product = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    category,
                    stock,
                    status,
                    id: FileProductManager.id
                };
                this.products.push(product);

                await this.writeProductsToFile();
            } 
        } catch (error) {
            console.error("Error al añadir el producto:", error.message);
            throw error;
        }
    }

    async readProducts() {
        try {
            let dataProduct = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(dataProduct);
        } catch (error) {
            console.error("Error al leer o parsear el archivo:", error.message);
            return [];
        }
    }

    async getProduct() {
        try {
            let reply = await this.readProducts();
            console.log(reply);
            return reply;
        } catch (error) {
            console.error("Error al obtener los productos:", error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            let getId = await this.readProducts();
            let filter = getId.find(product => product.id === id);
            console.log(filter);
            return filter;
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error.message);
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            let erase = await this.readProducts();
            let productFiltered = erase.filter(products => products.id !== id);
            await fs.writeFile(this.path, JSON.stringify(productFiltered, null, 2));
            console.log("Producto eliminado");
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            throw error;
        }
    }

    async updateProduct({ id, ...newProductData }) {
        try {
            await this.deleteProductById(id);
            let oldProducts = await this.readProducts();
            let modifyProduct = [{ ...newProductData, id }, ...(oldProducts || [])];
            await fs.writeFile(this.path, JSON.stringify(modifyProduct, null, 2));
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }
}
