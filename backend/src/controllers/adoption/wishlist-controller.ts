import { Request, Response } from "express";
import AdoptionWishList from "../../models/adoption/wishlist.model";

export const getWishlistData = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const wishListData = await AdoptionWishList.findOne({
      user: userId,
    }).populate("products.product");
    res
      .status(200)
      .json({ message: "Get wishlist data successfully", wishListData });
  } catch (error) {
    res.status(400).json({ message: "Failed to get the wishlist data", error });
    console.log("Error: Failed to get the wishlist data", error);
  }
};

export const addToWishList = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { petId } = req.body;

    const findUserCart = await AdoptionWishList.findOne({ user: userId });
    // console.log("uuu", findUserCart);

    if (!findUserCart) {
      const wishListData = await AdoptionWishList.create({
        user: userId,
        pets: { pet: petId },
      });
      return res.status(200).json({
        message: "Inserted product to wishlist successfully",
        wishListData,
      });
    }

    const findDuplicated = findUserCart.pets.findIndex(
      (item) => item.pet.toString() === petId
    );

    if (findDuplicated > -1) {
      //   res
      //     .status(200)
      //     .json({ message: "This product added to the wishlist already" });
      findUserCart.pets[findDuplicated].pet =
        findUserCart.pets[findDuplicated].pet;
    } else {
      findUserCart.pets.push({ pet: petId });
    }
    // findUserCart.products.push({ product: productId });
    const updatedCart = await findUserCart.save();

    res
      .status(200)
      .json({ message: "Added to wishlist successfully", updatedCart });
  } catch (error) {
    console.log("Couldn't added to wishlist", error);
    res
      .status(400)
      .json({ message: "Failed to add to the wishlist", error: error });
  }
};
export const deleteFromWishList = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { petId } = req.body;
    const findUserCart = await AdoptionWishList.findOne({ user: userId });
    console.log("findUserCart", findUserCart);

    if (!findUserCart) {
      return res.status(200).json({ message: "Couldn't find list or product" });
    }

    const findDuplicated = findUserCart.pets.findIndex(
      (item) => item.pet.toString() === petId
    );

    const deleteList = findUserCart.pets.splice(findDuplicated, 1);

    const updatedList = await findUserCart.save();

    res.status(200).json({ message: "deleted successfully", updatedList });
  } catch (error) {
    res.status(400).json({ message: "Couldn't deleted list", error });
    console.log("Error: Failed to delete list", error);
  }
};
export const updateWishList = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { petId, quantity } = req.body;
    const findUserCart = await AdoptionWishList.findOne({ user: userId });
    console.log("findUserCart", findUserCart);

    const updateCart = await AdoptionWishList.updateOne({});
    // const updatedCart = await updateCart.save();
    res.status(200).json({ message: "Updated successfully", updateCart });
  } catch (error) {
    res.status(400).json({ message: "Couldn't deleted cart", error });
    console.log("Error: Failed to delete cart", error);
  }
};
