import Cart from "../models/Cart.js"
import Products from "../models/Products.js"
import Transaction from "../models/Transaction.js"
import TransactionItems from "../models/TransactionItems.js"




export const getTransactionsByUser = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            where: {
                user_id: req.params.user_id
            },
            include: [TransactionItems]
        })
        res.json(transaction)
    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}


export const createTransactionFromCart = async (req, res) => {
    try {
        const {
            user_id,
            payment_method
        } = req.body;

        const cartItems = await Cart.findAll({
            where: {
                user_id
            },
            include: [Products]
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' })
        }

        const total_price = cartItems.reduce(
            (sum, item) => sum + (item.quantity * item.product.price), 0)

        const transaction = await Transaction.create({
            user_id,
            total_price,
            status: 'pending',
            payment_method
        });

        for (const item of cartItems) {
            await TransactionItems.create({
                transaction_id: transaction.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_purchase: item.product.price
            })
        }

        await Cart.destroy({
            where: {
                user_id
            }
        })

        res.status(201).json({ msg: 'Transaction created', transaction })
    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}

export const updateTransactionStatus = async (req, res) => {
    try {
        const {
            status
        } = req.body;
        await Transaction.update({
            status
        },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.json({ msg: 'Transaction status updated!!' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}