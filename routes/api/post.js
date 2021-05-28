const express = require('express');
const router = express.Router();
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Post = require('../../models/Post');

// @route   GET api/post
// @desc    TEST ROUTE
// @access  PUBLIC
  

router.post('/createPost', async(req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        let product = new Product(fields);

        if(files.photo){
            //check file size
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image shoulb be less than 1 mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        Post.save((err, data)=>{
            if(err || !data){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json(data);
        })

    })
});
