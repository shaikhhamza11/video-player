const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { findByIdAndDelete } = require('../../model/Video')
const Video = require('../../model/Video')


//for empty json
const isEmpty = (video => Object.keys(video).length === 0)
//@route GET api/videos
//@desc Tsst route
//@access public
router.get('/videos', async (req, res) => {
    console.log('get req for all video')
    try {
        const videos = await Video.find({})

        if (isEmpty(videos)) {
            return res.status(400).json({ "Error": 'No videos is available' })
        }
        res.json(videos)
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ "Error": 'Servor Error' })
    }
})
//@route GET api/videos/:id
//@desc Test route
//@access public
router.get('/videos/:_id', async (req, res) => {
    console.log('get req for all video')
    try {
        const video = await Video.findById(req.params._id)

        if (!video) {
            return res.status(400).json({ "Error": 'No videos is available' })
        }
        res.json(video)
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ "Error": 'Servor Error' })
    }
})
//@route Post api/videos
//@desc Test route
//@access public
router.post('/videos', [
    check('title', 'Title is required').not().isEmpty(),
    check('url', 'URL of the video  is required').not().isEmpty(),
    check('description', 'Description about the video  is required').not().isEmpty()
], async (req, res) => {
    console.log('Post a video')
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json(errors.array())

    }
    const { title, url, description } = req.body
    try {
        const video = await Video.findOne({ url })
        if (video) {
            return res.status(401).json({ "Error": 'Video with same URL already exists' })
        }
        newVideo = new Video();
        newVideo.title = title
        newVideo.url = url
        if (description) newVideo.description = description
        const savedVideo = await newVideo.save()
        res.json(savedVideo)
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ "Error": 'Servor Error' })
    }
})
//@route Put api/videos/:id
//@desc Test route
//@access public
router.put('/videos/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('url', 'URL of the video  is required').not().isEmpty(),
    check('description', 'Description about the video  is required').not().isEmpty()
], async (req, res) => {
    console.log('Post a video')
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json(errors.array())

    }
    const { title, url, description } = req.body
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $set: { title, url, description }
        }, { new: true })
        res.status(200).json(video)

    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ "Error": 'Servor Error' })
    }
})
//@route delete api/videos/:id
//@desc Test route
//@access public
router.delete('/videos/:id', async (req, res) => {
    console.log('Delete a video')


    try {
        const video = await Video.findByIdAndRemove(req.params.id)
        if (!video) {
            return res.status(400).json({ "Error": 'No video is available for this id' })
        }
        res.status(200).json(video)

    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ "Error": 'Servor Error' })
    }
})
module.exports = router