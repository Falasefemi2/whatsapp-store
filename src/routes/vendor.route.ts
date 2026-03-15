import { Hono } from "hono"
import { approveVendor, getAllVendors, getApprovedVendors, getPendingVendors, getVendorBySlug } from "../services/auth-service"
import { authMiddleware } from "../middleware/auth"
import { adminMiddleware } from "../middleware/admin"

const vendor = new Hono()

// public
vendor.get("/stores/:slug", async (c) => {
    try {
        const slug = c.req.param("slug")
        const store = await getVendorBySlug(slug)
        return c.json(store)
    } catch (error: any) {
        console.error("Error fetching vendor by slug:", error)
        return c.json({ message: error.message || "Failed to fetch vendor" }, 500)
    }
})

// admin only
vendor.get("/admin/vendors", authMiddleware, adminMiddleware, async (c) => {
    try {
        const vendors = await getAllVendors()
        return c.json(vendors)
    } catch (error: any) {
        console.error("Error fetching all vendors:", error)
        return c.json({ message: error.message || "Failed to fetch vendors" }, 500)
    }
})

vendor.get("/admin/vendors/pending", authMiddleware, adminMiddleware, async (c) => {
    try {
        const vendors = await getPendingVendors()
        return c.json(vendors)
    } catch (error: any) {
        console.error("Error fetching pending vendors:", error)
        return c.json({ message: error.message || "Failed to fetch pending vendors" }, 500)
    }
})

vendor.get("/admin/vendors/approved", authMiddleware, adminMiddleware, async (c) => {
    try {
        const vendors = await getApprovedVendors()
        return c.json(vendors)
    } catch (error: any) {
        console.error("Error fetching approved vendors:", error)
        return c.json({ message: error.message || "Failed to fetch approved vendors" }, 500)
    }
})

vendor.patch("/admin/vendors/:id/approve", authMiddleware, adminMiddleware, async (c) => {
    try {
        const id = c.req.param("id")
        const vendor = await approveVendor(id)
        return c.json({ message: "Vendor approved", vendor })
    } catch (error: any) {
        console.error("Error approving vendor:", error)
        return c.json({ message: error.message || "Failed to approve vendor" }, 500)
    }
})

export default vendor
