import { OpenAPIHono } from "@hono/zod-openapi"
import { Scalar } from "@scalar/hono-api-reference"
import vendor from "./routes/vendor.route"
import auth from "./routes/auth.route"
import product from "./routes/product.route"
import dashboard from "./routes/dashboard-route"

const app = new OpenAPIHono()

// routes
app.route("/auth", auth)
app.route("/vendors", vendor)
app.route("/products", product)
app.route("/dashboard", dashboard)

// OpenAPI JSON doc at /doc
app.doc("/doc", {
    openapi: "3.0.0",
    info: {
        title: "WhatsApp Store API",
        version: "1.0.0",
        description: "Vendor marketplace API"
    },
    servers: [{ url: "http://localhost:3000" }]
})

// Scalar UI at /scalar
app.get("/scalar", Scalar({ url: "/doc", theme: "purple" }))

export default app
