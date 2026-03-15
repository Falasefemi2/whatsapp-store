import { Hono } from "hono"
import { authMiddleware } from "../middleware/auth"
import { vendorMiddleware } from "../middleware/vendor"
import { getDashboardStats } from "../services/dashboard-service"
import type { AppContext } from "../lib/types"

const dashboard = new Hono<AppContext>()

dashboard.get("/stats", authMiddleware, vendorMiddleware, async (c) => {
    try {
        const user = c.get("user")
        if (!user.vendor) return c.json({ message: "Vendor not found" }, 404)
        const stats = await getDashboardStats(user.vendor.id)
        return c.json(stats)
    } catch (error: any) {
        return c.json({ message: error.message }, 400)
    }
})

export default dashboard
