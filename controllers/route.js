const { application } = require('express');
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
var sch1 = mongoose.model('logins')
var sch2 = mongoose.model('contents')

router.get('/', async (req, res) => {
    var faq = await sch2.find({ heading: "CREATE A NEW FAQ" }).lean()
    var mread = await sch2.find({ heading: "CREATE HAVE A READ SECTION" }).lean()
    var top = await sch2.find({ heading: "CREATE TOPICS YOU CANT MISS SECTION" }).lean()
    res.render('home1', {
        faqs: faq,
        topics: top,
        read: mread
    })
})


router.get('/login', async (req, res) => {

    res.render('login', {

    })
})

router.post('/login', async (req, res) => {
    var user = await sch1.find({ username: req.body.username, password: req.body.password }).lean()


    if (user.length == 1) {
        var s = './' + user[0]._id
        res.redirect(s)

    }
    else {
        res.send("please enter the correct admin details")
    }
})
router.get('/:id', async (req, res) => {
    var user = await sch1.find({ _id: req.params.id }).lean()
    res.render('subhome', {
        username: user[0].username,
        id: user[0]._id
    })

})

router.get('/:id/:title', (req, res) => {
    res.render('create', {
        title: req.params.title,
        id: req.params.id
    })
})

router.post('/:heading/create', (req, res) => {
    var valid = true;
    sta = { status: "valid", error: "no error" }
    if (req.body.title.length > 50) {
        sta = { status: "error", error: "length of title exceeded" }
    }
    if (req.body.title == '' || req.body.content == '') {
        sta = { status: "error", error: "fields cannot be empty" }
    }
    console.log(sta.error)
    if (sta.error == "no error") {
        sch2.insertMany({ title: req.body.title, content: req.body.content, heading: req.params.heading }, (err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                res.redirect('/')
            }
        })

    }
    else {
        res.send(sta.error)
    }
})

router.get('/:id/readmore/complete', async (req, res) => {
    var data = await sch2.find({ _id: req.params.id }).lean()
    res.render('readmore', {
        data: data[0]
    })

})
router.get('/:id/:type/data', (req, res) => {
    res.render('login2', {
        id: req.params.id,
        type: req.params.type
    })
})
router.post('/login2/:id/:type', async (req, res) => {
    var user = await sch1.find({ username: req.body.username, password: req.body.password })
    var type = req.params.type
    if (user.length == 1) {
        if (type == "delete") {
            sch2.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                
            })
            res.redirect('/')
        }
        else {
            res.render('update', {
                id: req.params.id
            })
        }
    }
    else {
        res.send("Please enter the correct admin details")
    }

})
router.post('/:id/update/data', (req, res) => {
    var sta = { status: "fine", error: "no error" }
    if (req.body.title == '' || req.body.content == '') {
        sta = { status: "error", error: "fields cannot be empty" }
    }
    if (req.body.title.length > 50) {
        sta = { status: "error", error: "Length of the title exceeded" }
    }
    if (sta.error == "no error") {
        sch2.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, content: req.body.content }, (err, data) => {
            if (err) {
                res.send(err)
            }
            
        })
        res.redirect('/')
    }
    else {
        res.send(sta.error)
    }

})

module.exports = router
