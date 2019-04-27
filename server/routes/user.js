const express = require('express');
const User = require('../models/user');
const router =  express.Router();


router.get('/', (req, res) => {
    User.find(req.query).then(data => res.json(data));
});

router.post('/', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(data => res.status(201).send(data))
        .catch(error => {
            if(error.name === 'ValidationError'){
                res.status(400).json(error.errors);
            } else {
                res.sendStatus(500);
            }
        })
});

router.put('/', (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            user.modified = new Date();
            user.save()
                .then(data => res.status(201).send(data))
                .catch(error => {
                    if(error.name === 'ValidationError'){
                        res.status(400).json(error.errors);
                    } else {
                        res.sendStatus(500);
                    }
                });
        }
    });

})
module.exports = router;