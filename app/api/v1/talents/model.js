const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Host name is required"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestaps: true }
);

module.exports = model("Talent", talentSchema);
