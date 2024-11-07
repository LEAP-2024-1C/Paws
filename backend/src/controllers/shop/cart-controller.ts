import { Request, Response } from "express";
import Cart from "../../models/cart.model";

export const getCartData = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    // const cartData = await Cart.find({
    const cartData = await Cart.findOne({
      user: userId,
    }).populate("products.product");
    res.status(200).json({ message: "Get cart data successfully", cartData });
  } catch (error) {
    res.status(404).json({ message: "Failed to get the cart data", error });
    console.log("Error: Failed to get the cart data", error);
  }
};

export const insertCartData = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id.toString();
    const { productId, totalAmount, quantity, size } = req.body;

    // Validate required fields
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "ProductId болон quantity заавал шаардлагатай",
      });
    }

    const findUserCart = await Cart.findOne({ user: userId });
    if (!findUserCart) {
      const cartData = await Cart.create({
        user: userId,
        products: [{ product: productId, quantity, size }],
        totalAmount: totalAmount || 0,
      });
      return res.status(201).json({
        success: true,
        message: "Сагс амжилттай үүслээ",
        data: cartData,
      });
    }

    const findDuplicated = findUserCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (findDuplicated > -1) {
      findUserCart.products[findDuplicated].quantity += quantity;
    } else {
      findUserCart.products.push({ product: productId, quantity, size });
    }

    const updatedCart = await findUserCart.save();

    return res.status(200).json({
      success: true,
      message: "Сагс амжилттай шинэчлэгдлээ",
      data: updatedCart,
    });
  } catch (error) {
    console.error("Сагсанд нэмэх үед алдаа гарлаа:", error);
    return res.status(500).json({
      success: false,
      message: "Сагс шинэчлэхэд алдаа гарлаа",
      error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
    });
  }
};

export const deleteCartData = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.body;
    const findUserCart = await Cart.findOne({ user: userId });
    console.log("findUserCart", findUserCart);

    if (!findUserCart) {
      return res.status(200).json({ message: "Couldn't find cart or product" });
    }

    const findDuplicated = findUserCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    const deleteCart = findUserCart.products.splice(findDuplicated, 1);

    const updatedCart = await findUserCart.save();

    res.status(200).json({ message: "deleted successfully", updatedCart });
  } catch (error) {
    res.status(400).json({ message: "Couldn't deleted cart", error });
    console.log("Error: Failed to delete cart", error);
  }
};

export const updateCartData = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { productId, newQuantity } = req.body;
    const findUserCart = await Cart.findOne({ user: userId });
    if (!findUserCart) {
      return res.status(400).json({ message: "User not found" });
    }

    const findProduct = findUserCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    findUserCart.products[findProduct].quantity = newQuantity;

    console.log("findUserCart", findUserCart);

    const updatedCart = await findUserCart.save();
    res.status(200).json({ message: "Updated successfully", updatedCart });
  } catch (error) {
    res.status(400).json({ message: "Couldn't deleted cart", error });
    console.log("Error: Failed to delete cart", error);
  }
};
