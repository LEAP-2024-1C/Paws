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
    res.status(400).json({ message: "Failed to get the cart data", error });
    console.log("Error: Failed to get the cart data", error);
  }
};

export const insertCartData = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { productId, totalAmount, quantity, size } = req.body;

    const findUserCart = await Cart.findOne({ user: userId });
    // console.log("uuu", findUserCart);

    if (!findUserCart) {
      const cartData = await Cart.create({
        user: userId,
        products: { product: productId, quantity, size },
        totalAmount,
      });
      return res
        .status(200)
        .json({ message: "Inserted data successfully", cartData });
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

    res
      .status(200)
      .json({ message: "Inserted data successfully", updatedCart });
  } catch (error) {
    console.log("Insert cart data error", error);
    res.status(400).json({ message: "Failed to create a cart", error: error });
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
