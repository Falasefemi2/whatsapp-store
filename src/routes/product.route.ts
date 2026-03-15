/** @format */

import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { vendorMiddleware } from "../middleware/vendor";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getVendorProducts,
  toggleProductActive,
  updateProduct,
} from "../services/product-service";
import { AppContext } from "../lib/types";

const product = new Hono<AppContext>();

// public
product.get("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await getProductById(id);
  return c.json(data);
});

// vendor only
product.get("/", authMiddleware, vendorMiddleware, async (c) => {
  const user = c.get("user");
  const data = await getVendorProducts(user.vendor!.id);
  return c.json(data);
});

product.post("/", authMiddleware, vendorMiddleware, async (c) => {
  const user = c.get("user");
  const formData = await c.req.formData();

  // extract text fields
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity"));

  // extract multiple image files
  const images = formData.getAll("images") as File[];

  await createProduct({
    name,
    description,
    price,
    quantity,
    vendorId: user.vendor!.id,
    images,
  });

  return c.json({ message: "Product created successfully" }, 201);
});

product.patch("/:id", authMiddleware, vendorMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const body = await c.req.json();
  const data = await updateProduct(id, user.vendor!.id, body);
  return c.json(data);
});

product.delete("/:id", authMiddleware, vendorMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  await deleteProduct(id, user.vendor!.id);
  return c.json({ message: "Product deleted" });
});

product.patch("/:id/toggle", authMiddleware, vendorMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const data = await toggleProductActive(id, user.vendor!.id);
  return c.json(data);
});

export default product;
