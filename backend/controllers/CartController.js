import Cart from "../models/Cart.js";
import Products from "../models/Products.js";

// ✅ 1. Get all items in user's cart
export const getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { user_id: req.params.user_id },
      include: [
        {
          model: Products,
          attributes: ["id", "name", "price", "stock", "image"]
        }
      ]
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ 2. Add product to cart (if exists, update quantity)
export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Cek produk ada atau tidak
    const product = await Products.findByPk(product_id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Cari apakah produk sudah ada di cart user
    let cartItem = await Cart.findOne({
      where: { user_id, product_id }
    });

    if (cartItem) {
      // Jika sudah ada → update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Jika belum ada → buat baru
      cartItem = await Cart.create({
        user_id,
        product_id,
        quantity
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ 3. Update quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    // Jika quantity = 0, hapus item
    if (quantity <= 0) {
      await cartItem.destroy();
      return res.json({ msg: "Item removed because quantity was 0" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ msg: "Cart updated", cartItem });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ 4. Remove a single item
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ msg: "Item not found" });

    await cartItem.destroy();
    res.json({ msg: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ 5. Clear cart after checkout
export const clearCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: { user_id: req.params.user_id }
    });
    res.json({ msg: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
