const express = require('express')
const router = express.Router()

const Dish = require('../../models/Dish')


router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find()
        if(!dishes) throw Error('Nema jela!')

        res.status(200).json(dishes)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.get('/', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id)
        if(!dish) throw Error('Ne postoji takavo jelo!')

        res.status(200).json(dish)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.get('/:resID/restaurant', async (req, res) => {
    Dish.find({ restaurant : req.params.resID })
    .exec(function(err, dishes){
        if(err){
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Jela nisu nadjena za dati ID restorana " + req.params.resID
                }) 
            }
            return res.status(500).send({
                message: "Greska prilikom dohvatanja jela za dati ID restorana " + req.params.resID
            })
        }
        res.status(200).send(dishes)
    })
})


router.post('/', async (req, res) => {
    const newDish = new Dish(req.body)
    try {
        const dish = await newDish.save()
        if(!dish) throw Error('Greska prilikom cuvanja novog jela!')

        res.status(200).json(dish)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id)
        if(!dish) throw Error('Greska prilikom brisanja jela!')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.patch('/:id', async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, req.body)
        if(!dish) throw Error('Greska prilikom update jela')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;