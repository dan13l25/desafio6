import { Router } from "express";
import CartManager from "../dao/manager/cartManager.js";
import cartsModel from "../dao/models/cart.js";


const cartRouter = Router();
const cartManagerInstance = new CartManager();

cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartManagerInstance.createCart();
        res.json(newCart);
    } catch (error) {
        console.error("Error al obtener el carrito:", error.message);
    }
});

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsModel.findById(cid); 
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        res.json(cart);
    } catch (error) {
        res.status(500).send("Error al obtener carrito");
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManagerInstance.addProduct(cid, pid);
        res.send("Producto agregado al carrito");
    } catch (error) {
        res.status(500).send("Error al agregar producto al carrito");
    }
});

export { cartRouter };