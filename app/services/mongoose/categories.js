const Categories = require("../../api/v1/categories/model");
const { badRequestError, notFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find().select("_id name");

  return result;
};

const createCategories = async req => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });

  if (check) throw new badRequestError("Duplicate category name");

  const result = await Categories.create({ name });

  return result;
};

const getOneCategories = async req => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id }).select("__id name");
  if (!result) {
    throw new notFoundError(`Category not found with id: ${id}`);
  }
  return result;
};

const updateCategories = async req => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({ name, _id: { $ne: id } });

  if (check) throw new badRequestError("Duplicate name categories");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidator: true }
  );

  if (!result) throw new notFoundError(`Category not found with id ${id}`);

  return result;
};

const deleteCategories = async req => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new notFoundError(`Category not found with id: ${id}`);

  await result.deleteOne();

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
};
