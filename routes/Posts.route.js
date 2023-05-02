const express = require('express');
const { PostsModel } = require('../models/Posts.model');


const postsRouter = express.Router();
// "PC", "TABLET", "MOBILE"

postsRouter.post('/create', async (req, res) => {
    const { device } = req.body;

    if (device == "PC" || device == "TABLET" || device == "MOBILE") {
        try {
            const newPost = new PostsModel(req.body);
            await newPost.save();
            res.status(200).send({ msg: "New post created" })
        }
        catch (error) {
            res.status(400).send(error.message)
        }
    }
    else {
        res.status(200).send({ msg: "Incorrect data" })
    }

})

postsRouter.get('/', async (req, res) => {
    const { device } = req.query;
    const { device1, device2 } = req.query

    if (device) {
        try {
            const posts = await PostsModel.find({ userId: req.body.userId, device: device });
            res.status(200).send(posts);
        }
        catch (error) {
            res.status(400).send(error.message)
        }
    }
    else if (device1 && device2) {
        try {
            const posts = await PostsModel.find({ userId: req.body.userId, device: [device1, device2] });
            res.status(200).send(posts);
        }
        catch (error) {
            res.status(400).send(error.message)
        }
    }
    else {
        try {
            const posts = await PostsModel.find({ userId: req.body.userId });
            res.status(200).send(posts);
        }
        catch (error) {
            res.status(400).send(error.message)
        }
    }

})

postsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostsModel.findOne({ userId: req.body.userId, _id: id });
        res.status(200).send(post);
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

postsRouter.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const post = await PostsModel.findOne({ _id: id })

    try {
        if (req.body.userId == post.userId) {
            await PostsModel.findByIdAndUpdate({ _id: id }, req.body);
            res.status(200).send({ msg: "Post updated" })
        }
        else {
            res.status(400).send({ msg: "You are not authorized" })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

})


postsRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const post = await PostsModel.findOne({ _id: id })

    try {
        if (req.body.userId == post.userId) {
            await PostsModel.findByIdAndDelete({ _id: id });
            res.status(200).send({ msg: "Post deleted" })
        }
        else {
            res.status(400).send({ msg: "You are not authorized" })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

})



module.exports = {
    postsRouter
}