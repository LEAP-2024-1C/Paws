import { Request, Response } from "express";

import Sos from "../../models/sos.model";

export const getAllSos = async (req: Request, res: Response) => {
  try {
    const sos = await Sos.find();
    res.status(200).json(sos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't get SOS" });
  }
};

export const createSos = async (req: Request, res: Response) => {
  try {
    const { description, location, number, imageUrl } = req.body;
    const sos = await Sos.create({ description, location, number, imageUrl });
    res.status(201).json(sos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't create SOS" });
  }
};
