import { Request, Response } from "express";
import PetProfile from "../../models/pets/petProfile.model";

export const getAllPetsInfo = async (req: Request, res: Response) => {
  try {
    const allPets = await PetProfile.find({});
    // .populate("petcategory")
    res.status(200).json({ message: "Get pets info successfully", allPets });
  } catch (error) {
    console.log("Failed to get all pets info", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createPetProfile = async (req: Request, res: Response) => {
  try {
    const { name, breed, age, gender, healthCondition, category } = req.body;
    const createNewProfile = await PetProfile.create({
      name,
      breed,
      age,
      gender,
      healthCondition,
      category,
    });
    res.status(201).json({
      message: "Created a pet profile successfully",
      createNewProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
