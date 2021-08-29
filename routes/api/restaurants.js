const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant')


router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
        if(!restaurants) throw Error('Nema porudzbina!')

        res.status(200).json(restaurants)
        console.log("Poslata je lista svih restorana!")
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        if(!restaurant) throw Error('Ne postoji takav restoran!')

        res.status(200).json(restaurant)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.post('/', async (req, res) => {
    const newRestaurant = new Restaurant(req.body)
    try {
        const restaurant = await newRestaurant.save()
        if(!restaurant) throw Error('Greska prilikom cuvanja novog restorana!')

        res.status(200).json(restaurant)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
        if(!restaurant) throw Error('Greska prilikom brisanja restorana!')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.patch('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body)
        if(!restaurant) throw Error('Greska prilikom update restorana')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;