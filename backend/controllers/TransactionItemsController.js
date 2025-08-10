import Products from "../models/Products.js"
import TransactionItems from "../models/TransactionItems.js"



export const getTransactionItems = async (req, res) => {
    try {
        const items = await TransactionItems.findAll({
            where: {
                transaction_id: req.params.transaction_id
            },
            include: [Products]
        });
        res.json(items)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const deleteTransactionItem = async (req,res) => {
    try {
        await TransactionItems.destroy({
            where:{
                id: req.params.id
            }
        });
        res.json({msg:'Transaction item deleted!!'})
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}