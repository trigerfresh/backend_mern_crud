import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.route.js'

dotenv.config()

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running @ http://localhost:${PORT}`)
})
