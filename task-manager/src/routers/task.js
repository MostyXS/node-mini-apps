const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})


router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdates = updates.every(update => allowedUpdates.includes(update))

    if(!isValidUpdates) return res.status(400).send({error: 'Invalid updates arguments'})

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new:true})
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        //May be refactor and move it upper
        if(!task) return res.status(404).send()

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id', async (req, res) => {
    
    try {
        const task = Task.findByIdAndDelete(req.params.id)

        if(!task) return res.status(404).send()

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router