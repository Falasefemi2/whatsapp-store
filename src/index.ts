import { OpenAPIHono } from "@hono/zod-openapi"
import { Scalar } from "@scalar/hono-api-reference"
import vendor from "./routes/vendor.route"
import auth from "./routes/auth.route"
import product from "./routes/product.route"
import dashboard from "./routes/dashboard-route"

const app = new OpenAPIHono()

app.openAPIRegistry.registerComponent("securitySchemes", "cookieAuth", {
    type: "apiKey",
    in: "cookie",
    name: "token"
})

app.route("/auth", auth)
app.route("/vendors", vendor)
app.route("/products", product)
app.route("/dashboard", dashboard)

app.doc("/doc", {
    openapi: "3.0.0",
    info: {
        title: "WhatsApp Store API",
        version: "1.0.0",
        description: "Vendor marketplace API"
    },
    servers: [{ url: "http://localhost:3000" }]
})

app.get("/scalar", Scalar({ url: "/doc", theme: "purple" }))

export default app
