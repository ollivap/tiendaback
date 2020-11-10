const express = require("express");
const router = express.Router();

// Controller
const {
  renderProductoForm,
  createNewProducto,
  renderProductos,
  renderEditForm,
  updateProducto,
  deleteProducto
} = require("../controllers/producto.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/productos/add", isAuthenticated, renderProductoForm);

router.post("/productos/new-note", isAuthenticated, createNewProducto);

// Get All Notes
router.get("/productos", isAuthenticated, renderProductos);

// Edit Notes
router.get("/productos/edit/:id", isAuthenticated, renderEditForm);

router.put("/productos/edit-producto/:id", isAuthenticated, updateProducto);

// Delete Notes
router.delete("/productos/delete/:id", isAuthenticated, deleteProducto);

module.exports = router;
