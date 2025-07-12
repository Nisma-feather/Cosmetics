const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Category = require("../models/Category");

const addCategory = async (req, res) => {
  try {
    const rawName = req.body.name;
    const name = rawName.trim().toLowerCase();

    const existing = await Category.findOne({ name });
    if (existing) {
      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads",
          req.file.filename
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      return res.status(404).json({ message: "category already Exists" });
    }

    const icon = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const newCategory = await Category.create({ name, icon });
    return res
      .status(200)
      .json({ newCategory, message: "New Category Created Successfully" });
  } catch (e) {
    console.log(e);
    if (req.file) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        req.file.filename
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    return res.status(500).json({ message: "Error Creating the Category", e });
  }
};
const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "error getting the categories", e });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const existing = await Category.findById(req.params.deleteId);
    if (!existing) {
      return res.status(400).json({ message: "Category doesn't exist" });
    }

    // Delete associated icon image if exists
    if (existing.icon) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        path.basename(existing.icon)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Then delete from DB
    await Category.findByIdAndDelete(req.params.deleteId);

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (e) {
    console.error("Delete Category Error:", e);
    return res
      .status(500)
      .json({ message: "Unable to delete the category", error: e.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const rawName = req.params.name;
    const name = rawName.trim().toLowerCase();
    const existing = await Category.findById(req.params.updateId);
    
    if (!existing) {
      return res.status(400).json({ message: "Category not found" });
    }
    const updatedData={name}
    if (req.file) {
        if(existing.icon){
            const imagePath = path.join(
              __dirname,
              "..",
              "uploads",
              path.basename(existing.icon)
            );
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }

        }
    
      
      updatedData.icon = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      
     
    }
    
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.updateId,
      updatedData,
      { new: true }
    );

    return res
      .status(200)
      .json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
  } catch (e) {

  }
};
module.exports = { addCategory, getCategory, deleteCategory };
