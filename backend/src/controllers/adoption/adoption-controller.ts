import { Request, Response } from "express";
import Adoption from "../../models/adoption/adoption.model";

export const getAdoptionPosts = async (req: Request, res: Response) => {
  try {
    const getAllPosts = await Adoption.find({});
    res
      .status(200)
      .json({ message: "get adoption posts successfully", getAllPosts });
  } catch (error) {
    console.log("couldn't get adoption posts", error);
    res.status(500).json({ message: "Server err", error });
  }
};

export const createAdoptionPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      userId,
      petId,
      location,
      pre_adoption_checks,
      status,
    } = req.body;
    const createPost = await Adoption.create({
      title,
      description,
      userId,
      petId,
      location,
      pre_adoption_checks,
      status,
    });
    res
      .status(201)
      .json({ message: "Created adoption post successfully", createPost });
  } catch (error) {
    console.log("couldn't create adoption posts", error);
    res
      .status(500)
      .json({ message: "Adoption create post: Server error", error });
  }
};
