// Create web server 
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for GET /comments/:id
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// 1. Create a web server
const comments = [
    { id: 1, name: 'Comment 1' },
    { id: 2, name: 'Comment 2' },
    { id: 3, name: 'Comment 3' },
];

// 2. Create a route for GET /comments
router.get('/', (req, res) => {
    res.send(comments);
});

// 3. Create a route for GET /comments/:id
router.get('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

// 4. Create a route for POST /comments
router.post('/', (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const comment = {
        id: comments.length + 1,
        name: req.body.name
    };
    comments.push(comment);
    res.send(comment);
});

// 5. Create a route for PUT /comments/:id
router.put('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    comment.name = req.body.name;
    res.send(comment);
});

// 6. Create a route for DELETE /comments/:id
router.delete('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res



