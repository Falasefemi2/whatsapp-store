import { MiddlewareHandler } from "hono"

export const adminMiddleware: MiddlewareHandler = async (c, next) => {
    const user = c.get("user")

    if (user.role !== "admin") {
        return c.json({ message: "Forbidden" }, 403)
    }

    await next()
}
