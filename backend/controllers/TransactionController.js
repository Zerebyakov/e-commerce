import db from "../config/Database.js";
import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Transaction from "../models/Transaction.js";
import TransactionItems from "../models/TransactionItems.js";

// ✅ 1. Get all transactions by user
export const getTransactionsByUser = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                user_id: req.params.user_id
            },
            include: [
                {
                    model: TransactionItems,
                    include: [
                        { model: Products, attributes: ["id", "name", "price", "image"] }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ✅ 2. Create transaction from cart (with stock update)
export const createTransactionFromCart = async (req, res) => {
    const t = await db.transaction();
    try {
        const { user_id, payment_method } = req.body;

        const cartItems = await Cart.findAll({
            where: { user_id },
            include: [Products]
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ msg: "Cart is empty" });
        }

        // Cek stok cukup
        for (const item of cartItems) {
            if (item.quantity > item.product.stock) {
                return res
                    .status(400)
                    .json({ msg: `Stock not enough for ${item.product.name}` });
            }
        }

        // Hitung total harga
        const total_price = cartItems.reduce(
            (sum, item) => sum + item.quantity * item.product.price,
            0
        );

        // Buat transaksi utama
        const transaction = await Transaction.create(
            {
                user_id,
                total_price,
                status: "paid", // sesuai requirement
                payment_method
            },
            { transaction: t }
        );

        // Buat detail transaksi + update stok
        for (const item of cartItems) {
            await TransactionItems.create(
                {
                    transaction_id: transaction.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_purchase: item.product.price
                },
                { transaction: t }
            );

            // Kurangi stok produk
            await Products.update(
                { stock: item.product.stock - item.quantity },
                { where: { id: item.product_id }, transaction: t }
            );
        }

        // Hapus cart user
        await Cart.destroy({ where: { user_id }, transaction: t });

        await t.commit();

        const transactionDetail = await Transaction.findByPk(transaction.id, {
            include: [
                {
                    model: TransactionItems,
                    include: [{ model: Products, attributes: ["id", "name", "price"] }]
                }
            ]
        });

        res.status(201).json({ msg: "Transaction successful", transactionDetail });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ msg: error.message });
    }
};

// ✅ 3. Update transaction status (Admin)
export const updateTransactionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Transaction.update(
            { status },
            { where: { id: req.params.id } }
        );
        res.json({ msg: "Transaction status updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ✅ 4. Get detail transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id, {
            include: [
                {
                    model: TransactionItems,
                    include: [{ model: Products, attributes: ["id", "name", "price"] }]
                }
            ]
        });

        if (!transaction) return res.status(404).json({ msg: "Transaction not found" });

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
