const express = require('express')
const router = express.Router()

const Order = require('../../models/Order')


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
        if(!orders) throw Error('Nema porudzbina!')

        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) throw Error('Ne postoji takava porudzbina!')

        res.status(200).json(order)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.post('/', async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const order = await newOrder.save()
        if(!order) throw Error('Greska prilikom cuvanja nove porudzbine!')

        res.status(200).json(order)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order) throw Error('Greska prilikom brisanja porudzbine!')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.patch('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body)
        if(!order) throw Error('Greska prilikom update porudzbine')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;