import { Hono } from 'hono'
import vendor from './routes/vendor.route'
import auth from './routes/auth.route'
import product from './routes/product.route'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})
app.route("/auth", auth)
app.route("/vendors", vendor)
app.route("/products", product)

export default app
