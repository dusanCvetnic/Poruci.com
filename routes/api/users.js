const express = require('express')
const { collection } = require('../../models/User')
const router = express.Router()


const User = require('../../models/User')


router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        if(!users) throw Error('Nema korisnika!')

        res.status(200).json(users)
        console.log("Poslata je lista svih korisnika!")
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) throw Error('Ne postoji takav korisnik!')

        res.status(200).json(user)
        console.log("Poslat je korisnik sa id-jem: " + req.params.id)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.post('/register', async (req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save()
        if(!user) throw Error('Greska prilikom dodavanja novog korisnika!')

        res.status(200).json(user)
        console.log("Dodat je novi korisnik!")
    } catch(err) {
        res.status(400).json({msg: err})
    }
})


router.post('/login', (req, res) => {
    const query = {
        email: req.body.email,
        password: req.body.password
    }

    collection.findOne(query, (err, result) =>{
        if(result){
            const objToSend = {
                email: result.email,
                role: result.role
            }

            res.status(200).send(JSON.stringify(objToSend))
            console.log("Ulogovao se korisnik!")
        } else {
            res.status(404).send()
        }
    })
})


router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) throw Error('Greska prilikom brisanja korisnika!')

        res.status(200).json({ success: true })
        console.log("Izbrisan je korisnik sa id-jem: " + req.params.id)
    } catch (err) {
        res.status(400).json({msg: err})
    }
})


router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if(!user) throw Error('Greska prilikom update korisnika')

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router;