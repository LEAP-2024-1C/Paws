import { Request, Response } from "express";

import Sos from "../../models/sos.model";

export const getAllSos = async (req: Request, res: Response) => {
  try {
    const sos = await Sos.find({}).sort({ createdAt: -1 });
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
      imageUrl,
      status: "Pending",
    });
    res.status(201).json({ message: "Created new sos successfully", sos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't create SOS", error });
  }
};

export const getAllSOSReports = async (req: Request, res: Response) => {
  try {
    const reports = await Sos.find().sort({ createdAt: -1 });
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch SOS reports" });
  }
};

export const updateSOSStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const report = await Sos.findByIdAndUpdate(id, { status }, { new: true });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to update report status" });
  }
};

export const deleteSOSReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Sos.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted SOS report successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete SOS report" });
  }
};
