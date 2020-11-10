const notesCtrl = {};

// Models
const Producto = require("../models/Producto");

productosCtrl.renderNoteForm = (req, res) => {
  res.render("productos/new-producto");
};

productosCtrl.createNewProducto = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor escribe un Titulo." });
  }
  if (!description) {
    errors.push({ text: "Por favor escribe una Descripcion" });
  }
  if (errors.length > 0) {
    res.render("productos/new-producto", {
      errors,
      title,
      description,
    });
  } else {
    const newProducto = new Producto({ title, description });
    newProducto.user = req.user.id;
    await newProducto.save();
    req.flash("success_msg", "Producto agregado satisfactoriamente");
    res.redirect("/productos");
  }
};

productosCtrl.renderNotes = async (req, res) => {
  const productos = await Producto.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("productos/all-productos", { productos });
};

productosCtrl.renderEditForm = async (req, res) => {
  const producto = await Producto.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/productos");
  }
  res.render("notes/edit-producto", { producto });
};

productosCtrl.updateProducto = async (req, res) => {
  const { title, description } = req.body;
  await Producto.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Producto actualizado satisfactoriamente");
  res.redirect("/productos");
};

productosCtrl.deleteProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Producto eliminado satisfactoriamente);
  res.redirect("/productos");
};

module.exports = productosCtrl;
