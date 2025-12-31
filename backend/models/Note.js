const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ FIX: prevent model overwrite error
module.exports = mongoose.models.Note || mongoose.model("Note", noteSchema);
