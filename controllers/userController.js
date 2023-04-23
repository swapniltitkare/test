import profileModel from "../models/profileModel.js";
import placementModel from "../models/placementModel.js";
import { ObjectId } from "mongodb";
import testModel from "../models/testModel.js";
import placementMaterialModel from "../models/placementMaterialModel.js";
export const createProfileCtrl = async (req, res) => {
  try {
    const profile = new profileModel(req.body);
    await profile.save();
    res.status(200).json({ message: "profile created success", success: true });
  } catch (error) {
    res.status(500).json({
      message: "profile creation failed",
      success: false,
      error: error.message,
    });
  }
};

export const getAllDrives = async (req, res) => {
  try {
    const alldrives = await placementModel.find({}).populate("postedBy");
    res.status(200).json(alldrives);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch all drives", error });
  }
};

export const getallplacedcompanies = async (req, res) => {
  try {
    const allcompanies = await profileModel.find(
      { userId: req.params.id },
      { placedData: 1 }
    );
    res.status(200).send(allcompanies);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch placed data" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const getprofile = await profileModel
      .find({ _id: req.params.id })
      .populate("user");
    res.status(200).json(getprofile);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch placed data" });
  }
};

export const getProfileUrl = async (req, res) => {
  try {
    const getprofile = await profileModel
      .find({ user: req.params.id })
      .populate("drivesApplied");

    res.status(200).json(getprofile);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch placed data" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    profileModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, detail) => {
        // Handle any possible database errors
        if (err) return res.status(500).send("failed to update profile");
        return res
          .status(200)
          .send({ message: "profile updated success", detail });
      }
    );
  } catch (error) {
    res.status(501).json({ message: "failed to update details" });
  }
};

export const getDrive = async (req, res) => {
  try {
    const drive = await placementModel.findById(req.params.id);
    res.status(200).json(drive);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch drive" });
  }
};

export const applyDrive = async (req, res) => {
  try {
    var { id } = req.params;

    const userId = req.body.userId;
    const profile = await profileModel.findOne({ user: userId });
    await placementModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: { applicants: profile._id },
      },
      { new: true }
    );

    const updatedprofile = await profileModel.findOneAndUpdate(
      { user: userId },
      {
        $push: { drivesApplied: id },
      },
      { new: true }
    );

    res.status(200).json({ message: "applied to drive success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "applied to drive failed", error });
  }
};

export const getAllAppliedDrives = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await profileModel.findOne({ user: id });
    res.status(200).json(list.drivesApplied);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch applied drive", error });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await testModel.find({});
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getAllAddedMaterial = async (req, res) => {
  try {
    const materials = await placementMaterialModel.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
