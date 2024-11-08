import { Request, Response } from "express";
import Adoption from "../../models/adoption/adoption.model";
import AdoptionRequest from "../../models/adoption/adoptin.req.model";

export const getAllAdoptionPosts = async (req: Request, res: Response) => {
  try {
    const getAllPosts = await Adoption.find({}).populate({
      path: "pet",
      model: "PetProfle",
      // select: "name species breed age gender",
    });
    res
      .status(200)
      .json({ message: "get adoption posts successfully", getAllPosts });
  } catch (error) {
    console.log("couldn't get adoption posts", error);
    res.status(500).json({ message: "Server err", error });
  }
};

export const getAdoptionPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getOnePost = await Adoption.findById(id).populate({
      path: "pet",
      model: "PetProfle",
      // select: "name species breed age gender",
    });
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

export const createAdoptionPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id.toString();
    const { title, description, pet, location, status, imgUrl } = req.body;
    const createPost = await Adoption.create({
      title,
      description,
      // userId,
      pet,
      location,
      status,
      imgUrl,
      userId,
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

export const updateAdoptionPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatePost = await Adoption.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Updated adoption post successfully", updatePost });
  } catch (error) {
    console.log("Couldn't update adoption post", error);
    res.status(500).json({ message: "Adoption post update error", error });
  }
};

export const deleteAdoptionPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletePost = await Adoption.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Deleted adoption post successfully", deletePost });
  } catch (error) {
    console.log("Couldn't delete adoption post", error);
    res.status(500).json({ message: "Adoption post delete error", error });
  }
};

export const getAdoptionInquiries = async (req: Request, res: Response) => {
  try {
    const getAllRequests = await AdoptionRequest.find({})
      .populate({
        path: "userId",
        select: "firstname lastname email",
      })
      // .populate({
      //   path: "petId",
      //   model: "PetProfile",
      // })
      .lean();

    res.status(200).json({
      message: "get adoption requests successfully",
      getAllRequests,
    });
  } catch (error) {
    console.log("couldn't get adoption requests", error);
    res.status(500).json({ message: "Server err", error });
  }
};

export const getOwnAdoptionInquiries = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id.toString();
    const getAllRequests = await AdoptionRequest.find({ userId })
      .populate({
        path: "userId",
        select: "firstname lastname email",
      })
      .populate({
        path: "petId",
        model: "PetProfle",
      })
      .lean();

    res.status(200).json({
      message: "get own adoption requests successfully",
      getAllRequests,
    });
  } catch (error) {
    console.log("couldn't get own adoption requests", error);
    res.status(500).json({ message: "Server err", error });
  }
};

export const submitInquiry = async (req: Request, res: Response) => {
  // if (!req.user) {
  //   return res.status(401).json({ message: "Authentication required" });
  // }
  const userId = req.user._id.toString();
  // console.log("UIDDDD", userId);

  const {
    petId,
    description,
    previousPetOwnership,
    currentPets,
    householdMembers,
    ageRanges,
    status,
    response,
    title,
  } = req.body;
  // console.log(id);
  try {
    const createPost = await AdoptionRequest.create({
      petId,
      description,
      previousPetOwnership,
      currentPets,
      householdMembers,
      ageRanges,
      status,
      title,
      userId,
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

export const updateAdoptionRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const updatePost = await AdoptionRequest.findByIdAndUpdate(
      id,
      { response },
      { new: true }
    );

    if (!updatePost) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    res.status(200).json({
      message: "Updated adoption req successfully",
      updatePost,
    });
  } catch (error) {
    console.log("Couldn't update adoption req", error);
    res.status(500).json({ message: "Adoption post update error", error });
  }
};
