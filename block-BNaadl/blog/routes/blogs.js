var express = require('express');
var router = express.Router();
var Article = require('../models/articleModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send("welcome to blog")
});

router.get('/new', (req,res,next)=>{
    res.render('formPage');
})

router.post( '/new', (req,res,next)=>{
    console.log(req.body);
    Article.create( req.body, (err,articles)=>{
        if (err) return next(err);
        res.redirect('/blogs/allArticles');
    } )
} )

router.get( '/allArticles', (req,res,next)=>{
    Article.find({},(err,articles)=>{
        if (err) return next(err);
        res.render('allArticles',{articles:articles});
    });
} );


router.get( '/:id/detail', (req,res,next)=>{
    var id = req.params.id;
    Article.findById( id, (err,articles)=>{
        if (err) return next(err);
        res.render('detailedArticle', {articles:articles});
    })
} )

router.get('/:id/edit',(req,res,next)=>{
    var id = req.params.id;
    Article.findById( id, (err,articles)=>{
        if (err) return next(err);
        res.render('editFormPage',{articles:articles});
    })
})

router.post('/:id/post', (req,res,next)=>{
    var id = req.params.id;
    Article.findByIdAndUpdate( id, req.body, (err,articles)=>{
        if (err) return next(err);
        // res.redirect('/blogs/'+id+'/detail')
        res.redirect('/blogs/allArticles')
        // res.render('detailedArticle',{articles:articles})
    } )
});

router.get( '/:id/delete', (req,res,next)=>{
    var id = req.params.id;
    Article.findByIdAndDelete( id, (err,articles)=>{
        if (err) return next(err);
        res.redirect('/blogs/allArticles');
    })
} );

// like logic
router.get( '/:id/like', (req,res,next)=>{
    var id = req.params.id;
    var like = req.body.likes
    var counter = like === 'likes' ? 1 : +1;
    Article.findByIdAndUpdate( id, {$inc: {likes: counter}}, (err,articles)=>{
        if (err) return next(err);
        res.redirect('/blogs/'+id+'/detail');
    }  )
})

//dislike logic
router.get( '/:id/dislike', (req,res,next)=>{
    var id = req.params.id;
    var dislike = req.body.likes
    var counter = dislike === 'likes' ? 1 : -1 ;
    Article.findByIdAndUpdate( id, {$inc: {likes: counter}}, (err,articles)=>{
        if (err) return next(err);
        res.redirect('/blogs/'+id+'/detail');
    }  )
})


module.exports = router;
