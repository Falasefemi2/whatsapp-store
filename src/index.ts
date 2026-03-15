import { Hono } from 'hono'
import vendor from './routes/vendor.route'
import auth from './routes/auth.route'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})
app.route("/auth", auth)
app.route("/vendors", vendor)

export default app
