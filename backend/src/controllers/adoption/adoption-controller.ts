import { Request, Response } from "express";
import Adoption from "../../models/adoption/adoption.model";
import AdoptionRequest from "../../models/adoption/adoptin.req.model";

export const getadoptionPostss = async (req: Request, res: Response) => {
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

export const getSingleadoptionPosts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getOnePost = await Adoption.findById(id);
    res
      .status(200)
      .json({ message: "get adoption post successfully", getOnePost });
  } catch (error) {
    console.log("couldn't get adoption post", error);
    res
      .status(500)
      .json({ message: "SingleadoptionPosts: Server error", error });
  }
};

export const createadoptionPosts = async (req: Request, res: Response) => {
  try {
    const { title, description, userId, pet, location, status } = req.body;
    const createPost = await Adoption.create({
      title,
      description,
      userId,
      pet,
      location,
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

export const getAdoptionInquiries = async (req: Request, res: Response) => {
  try {
    const getAllRequests = await AdoptionRequest.find({});
    res
      .status(200)
      .json({ message: "get adoption posts successfully", getAllRequests });
  } catch (error) {
    console.log("couldn't get adoption posts", error);
    res.status(500).json({ message: "Server err", error });
  }
};

export const submitInquiry = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      petId,
      description,
      petOwnershipHistory,
      CurrentPetOwnership,
      HouseholdSize,
      HouseholdAgeRanges,
    } = req.body;
    const createPost = await AdoptionRequest.create({
      userId,
      petId,
      description,
      petOwnershipHistory,
      CurrentPetOwnership,
      HouseholdSize,
      HouseholdAgeRanges,
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
