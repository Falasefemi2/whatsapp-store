import { MiddlewareHandler } from "hono"

export const vendorMiddleware: MiddlewareHandler = async (c, next) => {
    const user = c.get("user")

    if (user.role !== "vendor") {
        return c.json({ message: "Only vendors allowed" }, 403)
    }

    await next()
}
