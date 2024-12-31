import express from 'express'
import Product from '../models/product.model.js'
import mongoose from 'mongoose'

const router = express.Router()

router.post('/', async (req, res) => {
  const product = req.body
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' })
  }

  const newProduct = new Product(product)
  try {
    await newProduct.save()
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.error('Error in create product : ', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('Error in fetching products : ', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const product = req.body

  console.log('Product ID:', id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid Product Id' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    })

    if (!updatedProduct) {
      console.log('Product not found with id:', id)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }

    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  console.log('id', id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid Product Id' })
  }
  
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

export default router
