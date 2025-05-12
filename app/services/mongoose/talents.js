const Talents = require("../../api/v1/talents/model");
const { checkingImages } = require("./images");

const { badRequestError, notFoundError } = require("../../errors");

const getAllTalent = async req => {
  const { keyword } = req.query;

  let condition = {};

  if (keyword) {
    //fungsi if merupakan logic untuk melakukan checking apakah keyword ada isi atau null
    //jika ada maka lanjut kesini
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    //fungsi (...condition) adalah untuk melakukan copy terhadap variable condition
  }

  /**
   * checking logic sebelumnya juga null maka find all
   * jadi condition bisa juga seperti contoh (name: 'event baru')
   */
  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const createTalents = async req => {
  const { name, role, image } = req.body;

  //cari image dari field image
  await checkingImages(image);

  const check = await Talents.findOne({ name });

  if (check) throw new badRequestError("Host name already exists");

  const result = await Talents.create({
    name,
    image,
    role,
  });

  return result;
};

const getOneTalents = async req => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result) throw new notFoundError(`Host not found with id: ${id}`);

  return result;
};

const updateTalents = async req => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  await checkingImages(image);

  const check = await Talents.findOne({
    name,
    id: { $ne: id },
  });

  if (check) throw new notFoundError("Host name already exists");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role },
    { new: true, runValidators: true }
  );

  if (!result) throw new notFoundError(`Host not found with id: ${id}`);

  return result;
};

const deleteTalents = async req => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id });

  if (!result) throw new notFoundError(`Host name not found with id: ${id}`);

  await result.deleteOne();

  return result;
};

const checkingTalents = async req => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new notFoundError(`Host name not found with id: ${id}`);

  return result;
};

module.exports = {
  getAllTalent,
  getOneTalents,
  createTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
