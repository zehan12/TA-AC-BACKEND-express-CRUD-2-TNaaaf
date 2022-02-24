var express = require('express');
var router = express();
var Article = require('../models/article');
var Comment = require('../models/comment');

router.get( '/:id/edit', (req,res,next)=>{
    var id = req.params.id;
    Comment.findById( id, (err,comments)=>{
        console.log(comments,"edit");
        if(err ) return next(err)
        res.render('updateComment', {comments})
    })
});

router.post( '/:id/post', (req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(  id, req.body , (err,comments)=>{
        if (err) return next(err);
        res.redirect('/blogs/'+ comments.articleId +'/detail');
    });
});

router.get( '/:id/delete', (req,res,next)=>{
    var commentId = req.params.id;
    Comment.findByIdAndRemove( commentId, (err,comments)=>{
        if (err) return next(err);
        res.redirect('/blogs/'+comments.articleId+'/detail' )
    } )
});

router.get( '/:id/like', (req,res,next)=>{
    var id = req.params.id;
});

router.get( '/:id/dislike', (req,res,next)=>{
    var id = req.params.id;
});


module.exports = router;