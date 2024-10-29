import { Request, Response } from "express";

import Sos from "../../models/sos.model";

export const getAllSos = async (req: Request, res: Response) => {
  try {
    const sos = await Sos.find({});
    res.status(200).json({ message: "Get all sos data success", sos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't get SOS", error });
  }
};

export const createSos = async (req: Request, res: Response) => {
  try {
    const { description, location, phoneNumber, imageUrl } = req.body;
    const sos = await Sos.create({
      description,
      location,
      phoneNumber,
      image: imageUrl,
    });
    res.status(201).json({ message: "Created new sos successfully", sos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't create SOS", error });
  }
};
