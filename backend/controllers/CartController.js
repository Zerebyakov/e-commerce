import Cart from "../models/Cart.js";
import Products from "../models/Products.js";



export const getCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: {
                user_id: req.params.user_id
            },
            include: [Products]
        })
        res.json(cart)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const addToCart = async (req, res) => {
    try {
        const {
            user_id,
            product_id,
            quantity
        } = req.body;
        const cartItem = await Cart.create({
            user_id,
            product_id,
            quantity
        })
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        await Cart.update(
            {
                quantity
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.json({ msg: 'Cart Updated !!' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const removeFromCart = async (req,res) => {
    try {
        await Cart.destroy({
            where:{
                id: req.params.id
            }
        })
        res.json({msg:'Item Remove From Cart !'})
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}