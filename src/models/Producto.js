const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    precio: {
      type: Numeric,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Producto", ProductoSchema);
