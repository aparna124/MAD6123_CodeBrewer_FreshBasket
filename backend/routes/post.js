const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('/',  async (req, res) => {
    // res.send("We are on posts");
    const title = req.query.title;
    const filter = {
        title: {"$regex": title}
    }
    const posts = await Post.find(filter);
    res.send(posts)
})


router.post('/', (req, res) => {

    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
    .then(data => {

        res.json(data);
    })
    .catch(err => {
        res.json({Message: err});
    })
});

module.exports = router;