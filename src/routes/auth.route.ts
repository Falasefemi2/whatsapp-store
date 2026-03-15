import { Hono } from "hono"
import { setCookie } from "hono/cookie"
import { loginVendor, registerVendor } from "../services/auth-service"

const auth = new Hono()

auth.post("/register", async (c) => {
    try {
        const body = await c.req.json()
        await registerVendor(body)
        return c.json({ message: "Registration successful, check your email for approval" }, 201)
    } catch (error: any) {
        console.error("Register error:", error)
        return c.json({ message: error.message || "Registration failed" }, 500)
    }
})

auth.post("/login", async (c) => {
    try {
        const { email, password } = await c.req.json()
        const { token, user } = await loginVendor(email, password)

        setCookie(c, "token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        return c.json({ message: "Login successful", user })
    } catch (error: any) {
        console.error("Login error:", error)
        return c.json({ message: error.message || "Login failed" }, 401)
    }
})

export default auth
